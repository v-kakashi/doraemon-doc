$(function ready () {
  $.get( relativePath + '/menu.json', function (dataList) {
    /*
    <ul class="ant-menu ant-menu-inline aside-container ant-menu-light ant-menu-root" >
      <li class="ant-menu-submenu-inline ant-menu-submenu-open ant-menu-submenu">
        <div class="ant-menu-submenu-title">
          <h4>组件</h4>
        </div>
        <ul class="ant-menu ant-menu-inline ant-menu-sub">
          <% for(var key in file.link) { var self = key === file.resource.relativeToDemo %>
            <li class="ant-menu-item">
              <a href="<%= self ? '' : file.link[key] + '.html' %>"><span><%= key %></span></a>
            </li>
          <% } %>
        </ul>
      </li>
    </ul>
    */
    var menuMap = {}
    var href = window.location.href
    dataList.forEach(function (data) {
      var category = menuMap[data.category] || (menuMap[data.category] = { category: data.category, itemMap: {}, items: [] })
      if(data.type){
        category.itemMap[data.type] || ( category.itemMap[data.type] = { children: [], isNode: true } )
        if (/index\.html$/.test(data.url)) {
          // category.itemMap[data.type].url = '#'
          category.itemMap[data.type].title = data.type
        }
        category.itemMap[data.type].children.push(data)
      } else {
        category.items.push(data)
      }

      // debugger
      if (new RegExp(data.url, 'i').test(href)) {
        data.url = '#'
        data.isSelf = true
      } else {
        data.isSelf = false
      }
    })

    for(var key in menuMap) {
      var menu = menuMap[key]
      for (var itmeKey in menu.itemMap) {
        var item = menu.itemMap[itmeKey]
        menu.items.push(item)
      }
    }

    var tplData = []
    tplData.push(menuMap['说明'])
    tplData.push(menuMap['组件'])
    console.log(tplData)
    var template = Handlebars.compile($('#menu-template').html())
    var html = template({ 'menu': tplData })

    $('#menu').append(html)
  })
})
