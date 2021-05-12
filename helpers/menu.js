 const getMenuFrontEnd=(rol='USER_ROLE')=>{
    const menu= [
        {
          titulo:"Panel",
          icono:"mdi mdi-gauge",
          submenu:[
            { titulo:"Principal",url:'/'},
            { titulo:"Promesa", url:"promesa"},
            {titulo: "rxjs", url:"rxjs"}
    
          ]
        },
        {
          titulo:"Mantenimientos",
          icono:"mdi mdi-folder-lock-open",
          submenu:[
            // { titulo:"Usuarios",url:'usuarios'},
            { titulo:"Hospitales", url:"hospitales"},
            {titulo: "Médicos", url:"medicos"}
    
          ]
        }
    
      ]
      if(rol === 'ADMIN_ROLE'){
          menu[1].submenu.unshift({ titulo:"Usuarios",url:'usuarios'})
      }
      return menu;
}

module.exports={
    getMenuFrontEnd
}