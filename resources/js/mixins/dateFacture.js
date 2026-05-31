module.exports = {
    methods: {
        getList() {
            this.$store.dispatch("Companyactions");
            this.$store.dispatch("MoneySigleactions");

            let date_now = "";

            // 1. Si el componente ya definió un 'date' (el input o el created), usamos ese
            if (this.date && this.date !== "") {
                date_now = this.date;
            } else {
                // 2. Si no hay fecha, calculamos la fecha actual local de forma segura
                let date = new Date();
                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                // Asegurar siempre los dos dígitos agregando el cero a la izquierda si es necesario
                let monthStr = month < 10 ? `0${month}` : month;
                let dayStr = day < 10 ? `0${day}` : day;

                date_now = `${year}-${monthStr}-${dayStr}`;
                
                // Guardamos la fecha en el componente para que el input se sincronice
                this.date = date_now;
            }

            // 3. Disparar todas las acciones de Vuex con la MISMA fecha unificada
            this.$store.dispatch("Factureactions", date_now);
            this.$store.dispatch("TypeSaleactions", date_now);
            this.$store.dispatch("Billtotactions", date_now);
        },
    },
};