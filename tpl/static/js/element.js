$(function ready () {
  $.get('/menu.json', function (dataList) {
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
    var menu = []
    var href = window.location.href
    dataList.forEach(function (data) {
      menuMap[data.category] || (menuMap[data.category] = { category: data.category, items: [] })
      menuMap[data.category].items.push(data)
      if (new RegExp(data.url, 'i').test(href)) {
        data.url = '#'
        data.isSelf = true
      } else {
        data.isSelf = false
      }
    })
    menu.push(menuMap['说明'])
    menu.push(menuMap['组件'])
    var template = Handlebars.compile($('#menu-template').html())
    var html = template({ 'menu': menu })

    $('#menu').append(html)
  })
})
