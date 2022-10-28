const { createApp } = Vue

createApp({
    data() {
        return {
            urlApi:"https://apipetshop.herokuapp.com/api/articulos",
            productos:[],
            productosBk: [],
            ultimosProductos:[],
            buscador: ""
        }
    },
    created(){
        this.traerDatos()
    },
    methods:{
        traerDatos(){
            fetch(this.urlApi).then(response =>response.json())
            .then(data =>{
                this.productos= data.response
                if(document.title=="Jugueteria"){
                    this.productos=data.response.filter(producto => producto.tipo == "Juguete")
                    this.ultimosProductos= this.productos.filter(producto => producto.stock<5)
                } else if(document.title =="Farmacia"){
                    this.productos=data.response.filter(producto => producto.tipo == "Medicamento")
                    this.ultimosProductos= this.productos.filter(producto => producto.stock<5)
                }
                this.productosBk=this.productos
            })

        },
        enviarMensaje(){
            Swal.fire({
                title: 'Su mensaje ha sido enviado con éxito',
                imageUrl: './assets/img/succes.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'succes',
            })
            document.forms[0][0].value = "";
            document.forms[0][1].value = "";
            document.forms[0][2].value = "";
            document.forms[0][3].value = "";
        }
        
    },
    computed:{ 
        filtro(){
            this.productos=this.productosBk.filter(producto => producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())||producto.descripcion.toLowerCase().includes(this.buscador.toLowerCase()))
        }
        
        
    }
}).mount('#app')