window.serviciosController = function() {
    return {
        listaServicios: [],
        formulario: {
            computador: '',
            servicio: '',
            cantidad: 1
        },

        getService() {
            return window.serviciosService || window.servicioServicios;
        },

        async init() {
            await this.cargarDatos();
        },

        async cargarDatos() {
            try {
                const srv = this.getService();
                let datos = null;

                if (srv) {
                    if (typeof srv.obtenerTodos === 'function') {
                        datos = await srv.obtenerTodos();
                    } else if (typeof srv.listar === 'function') {
                        datos = await srv.listar();
                    }
                }

                if (!datos || !Array.isArray(datos) || datos.length === 0) {
                    const local = localStorage.getItem('cybernet_servicios');
                    datos = local ? JSON.parse(local) : [];
                }

                
                localStorage.removeItem('servicios');

                
                const unicos = [];
                const idsVistas = new Set();
                for (const item of (Array.isArray(datos) ? datos : [])) {
                    if (item && item.id) {
                        const idStr = String(item.id);
                        if (!idsVistas.has(idStr)) {
                            idsVistas.add(idStr);
                            unicos.push(item);
                        }
                    }
                }

                
                localStorage.setItem('cybernet_servicios', JSON.stringify(unicos));
                this.listaServicios = unicos;
            } catch (error) {
                console.error("Error al cargar datos:", error);
                const local = localStorage.getItem('cybernet_servicios');
                this.listaServicios = local ? JSON.parse(local) : [];
            }
        },

        async guardarNuevo() {
            if (!this.formulario.computador || !this.formulario.servicio || !this.formulario.cantidad) {
                alert("Por favor completa todos los campos.");
                return;
            }

            const nuevoItem = {
                id: Date.now().toString(),
                computador: this.formulario.computador,
                servicio: this.formulario.servicio,
                cantidad: Number(this.formulario.cantidad)
            };

            try {
                const srv = this.getService();
                let guardado = false;

                if (srv) {
                    if (typeof srv.crear === 'function') {
                        await srv.crear(nuevoItem);
                        guardado = true;
                    } else if (typeof srv.guardar === 'function') {
                        await srv.guardar(nuevoItem);
                        guardado = true;
                    }
                }

                
                if (!guardado) {
                    const locales = JSON.parse(localStorage.getItem('cybernet_servicios') || '[]');
                    locales.push(nuevoItem);
                    localStorage.setItem('cybernet_servicios', JSON.stringify(locales));
                }

                this.formulario = { computador: '', servicio: '', cantidad: 1 };
                await this.cargarDatos();
            } catch (error) {
                console.error("Error al guardar:", error);
                await this.cargarDatos();
            }
        },

        async borrar(id) {
            try {
                const srv = this.getService();
                if (srv) {
                    if (typeof srv.eliminar === 'function') await srv.eliminar(id);
                    else if (typeof srv.borrar === 'function') await srv.borrar(id);
                }
            } catch (e) {
                console.error("Error al borrar:", e);
            }

            let locales = JSON.parse(localStorage.getItem('cybernet_servicios') || '[]');
            locales = locales.filter(item => String(item.id) !== String(id));
            localStorage.setItem('cybernet_servicios', JSON.stringify(locales));

            await this.cargarDatos();
        }
    };
};