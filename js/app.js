document.addEventListener('alpine:init', () => {
   
    const serviciosRepo = new ServiciosRepository();
    
    const serviciosService = new ServiciosService(serviciosRepo);
    window.serviciosService = serviciosService; 
    const style = document.createElement('style');
    style.innerHTML = '[x-cloak] { display: none !important; }';
    document.head.appendChild(style);
});