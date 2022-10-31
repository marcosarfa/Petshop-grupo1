const { createApp } = Vue

createApp({
    data() {
        return {
            urlApi: "https://apipetshop.herokuapp.com/api/articulos",
            productos: [],
            productosBk: [],
            ultimosProductos: [],
            buscador: "",
            carrito: [],
            producto: {},
            retiro: "",
            total:[]
        }
    },
    created() {
        this.traerDatos()
        if (JSON.parse(localStorage.getItem('carrito'))) {
            this.carrito = JSON.parse(localStorage.getItem('carrito'))
        }
    },
    methods: {
        traerDatos() {
            fetch(this.urlApi).then(response => response.json())
                .then(data => {
                    this.productos = data.response
                    if (document.title == "Jugueteria") {
                        this.productos = data.response.filter(producto => producto.tipo == "Juguete")
                        this.ultimosProductos = this.productos.filter(producto => producto.stock < 5)
                    } else if (document.title == "Farmacia") {
                        this.productos = data.response.filter(producto => producto.tipo == "Medicamento")
                        this.ultimosProductos = this.productos.filter(producto => producto.stock < 5)
                    } else if (document.title == "Detalles") {
                        let id = new URLSearchParams(location.search).get("id");
                        this.producto = this.productos.find(producto => producto._id == id);
                    }
                    this.productosBk = this.productos
                })
        },
        regresar() {
            window.history.back();
        },
        agregarCarrito(producto) {
            if (!this.carrito.includes(producto) && producto.stock>0) {
                this.carrito.push(producto)
                this.carrito.forEach(elemento => {
                    if(elemento._id==producto._id){
                        elemento.__v++
                        producto.stock--
                    }
                });
                
            } else {
                this.carrito.forEach(elemento => {
                    if(elemento._id==producto._id){
                        if (producto.stock>0) {
                            elemento.__v++;
                            producto.stock--;
                        } else {
                            Swal.fire({
                                title: 'No hay stock del producto seleccionado',
                                text: 'Disculpe las molestias ocasionadas, pronto lo repondremos',
                                imageUrl: './assets/img/perroNoHayStock.png',
                                imageWidth: 200,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            })
                        }
                        
                    }
                })

            }
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        eliminarCarrito(producto) {
            this.carrito = this.carrito.filter(productoC => productoC != producto)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        vaciarCarrito() {
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
        },
        compraRealizada(){
            Swal.fire({
                title: 'Compra Realizada!',
                text: 'Muchas gracias! Lo esperamos de regreso!',
                imageUrl: './assets/img/succes.png',
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: 'Custom image'
        })
        },
        enviarMensaje() {
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
    computed: {
        filtro() {
            this.productos = this.productosBk.filter(producto => producto.nombre.toLowerCase().includes(this.buscador.toLowerCase()) || producto.descripcion.toLowerCase().includes(this.buscador.toLowerCase()))
        }


    }
}).mount('#app')