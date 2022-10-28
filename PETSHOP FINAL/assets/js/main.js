const { createApp } = Vue

createApp({
    data() {
        return {
            urlApi:"https://apipetshop.herokuapp.com/api/articulos",
            productos:[],
            productosBk: [],
            ultimosProductos:[],
            buscador: "",
            producto:{},
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
                } else if(document.title == "Detalles"){
                    let id = new URLSearchParams(location.search).get("id");
                    this.producto= this.productos.find(producto => producto._id == id);
                }                
                this.productosBk=this.productos
            })
        },
        regresar(){
            window.history.back();
        },
        
    },
    computed:{ 
        filtro(){
            this.productos=this.productosBk.filter(producto => producto.nombre.toLowerCase().includes(this.buscador.toLowerCase())||producto.descripcion.toLowerCase().includes(this.buscador.toLowerCase()))
        }
        
        
    }
}).mount('#app')