const app = new Vue({
    el:'#app',
    data:{
        // Objetos que contengan información de la app (modelos)
        users: [
        ],
        user:{
            name: 'Luis',
            lastName: 'Ramírez'
        },
        operators:{
            n1: 0,
            n2: 0,
            res: 0
        }
    },
    methods:{
        // Todas las funciones comunes de la app
        // Es un método que tiene que ser llamado para ejecutarse
        sum: function(event){
            this.operators.res = this.operators.n1 + this.operators.n2;
        }
    },
    computed: {
        // Actualiza solo, siempre se está ejecutando, se vuelve una propiedad virtual
        // Siempre tiene que regresar un resultado, si no, no mostraría nada
        result(){
            return this.operators.n1 + this.operators.n2;
        }
        // Funciones que podrán ser
        // desplegables en las vistas sólo si regresan un resultado.

    },
    created(){
        // Aquí se ejecuta código al inicializar la aplicación.
        fetch('/users/get/')
        .then(response => response.json())
        .then(json => {
            this.users = json.data.docs;
        });
    }
});
