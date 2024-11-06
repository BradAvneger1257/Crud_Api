#Instalar Insomnia.REST(Recomendado) o Postman API
# Realizar las importaciones de Flask
    #Modulos    Clase(Contructor)
from flask import Flask, render_template, request
#Crear una instancia de la clase
#mysql = MySQL(app)

#Creación de un objeto--configuracion
app = Flask(__name__)
#Conexión a la base de datos
app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='password'
app.config['MYSQL_DB']='prueba'

#Creacion de las Rutas --> URL
#HTTP Get,Post,Put,Delete
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/add_contact', methods=['POST'])
def add_contact():
    #Validación
    if request.method == 'POST':
        #Cazar Variables
        fullname = request.form['fullname']
        phone = request.form['phone']
        email = request.form['email']
        #Imprimir
        print(fullname)
        print(phone)
        print(email)
        return 'Recived'

#Ruta para editar
@app.route('/edit')
def edit_contact():
    return '<h1>Actualizar Contacto</h1>'
#Ruta para editar
@app.route('/delete')
def delete_contact():
    return '<h1>Eliminar Contacto</h1>'

if __name__ == '__main__': 
    app.run(debug=True)
