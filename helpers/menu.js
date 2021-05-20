 const getMenuFrontEnd=(rol='USER_ROLE')=>{
    const menu= [
        {
          titulo:"Inicio",
          icono:"mdi mdi-home",
          submenu:[
            { titulo:"Principal",url:'/'},
           //{ titulo:"Promesa", url:"promesa"},
          //   // {titulo: "rxjs", url:"rxjs"}

          ]
        },
        {
          titulo:"Mantenimientos",
          icono:"mdi mdi-folder-lock-open",
          submenu:[
            // { titulo:"Usuarios",url:'usuarios'},
            { titulo:"Hospitales", url:"hospitales"},
            {titulo: "Médicos", url:"medicos"},
    
          ]
        },
        {
          titulo:"Gestiones",
          icono:"mdi mdi-archive",
          submenu:[
          
            { titulo:"Enviar Localizaciones", url:"localizaciones"},
            { titulo:"Horarios", url:"horarios"}
 
          ]
        },
        

      ]
      if(rol === 'ADMIN_ROLE'){
          menu[1].submenu.unshift({ titulo:"Usuarios",url:'usuarios'})
      }
      return menu;
}

module.exports={
    getMenuFrontEnd
}