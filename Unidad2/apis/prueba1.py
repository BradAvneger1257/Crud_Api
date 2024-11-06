from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Agregamos CORS
import pymysql

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)  # Habilitar CORS

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:8r4dl3ym0r4l35@localhost/alumnos_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de base de datos
class Alumno(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    carrera = db.Column(db.String(100), nullable=False)
    edad = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "carrera": self.carrera, "edad": self.edad}

@app.route('/alumnos', methods=['GET'])
def get_alumnos():
    alumnos = Alumno.query.all()
    return jsonify([alumno.to_dict() for alumno in alumnos])

@app.route('/alumnos/<int:id_alum>', methods=['GET'])
def get_alumno(id_alum):
    alumno = Alumno.query.get(id_alum)
    if alumno:
        return jsonify(alumno.to_dict())
    else:
        return jsonify({"Error": "No se encontró el alumno"}), 404

@app.route('/alumnos', methods=['POST'])
def add_alumno():
    data = request.json
    new_alumno = Alumno(name=data['name'], carrera=data['carrera'], edad=data['edad'])
    db.session.add(new_alumno)
    db.session.commit()
    return jsonify(new_alumno.to_dict()), 201

@app.route('/alumnos/<int:id_item>', methods=['PUT'])
def update_alumno(id_item):
    alumno = Alumno.query.get(id_item)
    if alumno:
        data = request.json
        alumno.name = data['name']
        alumno.carrera = data['carrera']
        alumno.edad = data['edad']
        db.session.commit()
        return jsonify(alumno.to_dict())
    else:
        return jsonify({"Error": "Alumno no Encontrado"}), 404

@app.route('/alumnos/<int:id_item>', methods=['DELETE'])
def delete_alumno(id_item):
    alumno = Alumno.query.get(id_item)
    if alumno:
        db.session.delete(alumno)
        db.session.commit()
        return jsonify({"message": "Alumno Eliminado"}), 200
    else:
        return jsonify({"Error": "Alumno no Encontrado"}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crea las tablas
    app.run(debug=True)
