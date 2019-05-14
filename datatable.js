  var bsDataTables = function (dataTableSelector, columns, url, actions) {
      var $DataTable = jQuery.fn.dataTable;

      // Set the defaults for DataTables init
      jQuery.extend(true, $DataTable.defaults, {
          dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
              "<'row'<'col-sm-12'tr>>" +
              "<'row'<'col-sm-6'i><'col-sm-6'p>>",
          renderer: 'bootstrap',
          oLanguage: {
              sLengthMenu: "_MENU_",
              sInfo: "Showing <strong>_START_</strong>-<strong>_END_</strong> of <strong>_TOTAL_</strong>",
              oPaginate: {
                  sPrevious: '<i class="fa fa-angle-left"></i>',
                  sNext: '<i class="fa fa-angle-right"></i>'
              }
          }
      });

      // Default class modification
      jQuery.extend($DataTable.ext.classes, {
          sWrapper: "dataTables_wrapper form-inline dt-bootstrap",
          sFilterInput: "form-control",
          sLengthSelect: "form-control"
      });

      // Bootstrap paging button renderer
      $DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
          var api = new $DataTable.Api(settings);
          var classes = settings.oClasses;
          var lang = settings.oLanguage.oPaginate;
          var btnDisplay, btnClass;

          var attach = function (container, buttons) {
              var i, ien, node, button;
              var clickHandler = function (e) {
                  e.preventDefault();
                  if (!jQuery(e.currentTarget).hasClass('disabled')) {
                      api.page(e.data.action).draw(false);
                  }
              };

              for (i = 0, ien = buttons.length; i < ien; i++) {
                  button = buttons[i];

                  if (jQuery.isArray(button)) {
                      attach(container, button);
                  } else {
                      btnDisplay = '';
                      btnClass = '';

                      switch (button) {
                          case 'ellipsis':
                              btnDisplay = '&hellip;';
                              btnClass = 'disabled';
                              break;

                          case 'first':
                              btnDisplay = lang.sFirst;
                              btnClass = button + (page > 0 ? '' : ' disabled');
                              break;

                          case 'previous':
                              btnDisplay = lang.sPrevious;
                              btnClass = button + (page > 0 ? '' : ' disabled');
                              break;

                          case 'next':
                              btnDisplay = lang.sNext;
                              btnClass = button + (page < pages - 1 ? '' : ' disabled');
                              break;

                          case 'last':
                              btnDisplay = lang.sLast;
                              btnClass = button + (page < pages - 1 ? '' : ' disabled');
                              break;

                          default:
                              btnDisplay = button + 1;
                              btnClass = page === button ?
                                  'active' : '';
                              break;
                      }

                      if (btnDisplay) {
                          node = jQuery('<li>', {
                                  'class': classes.sPageButton + ' ' + btnClass,
                                  'aria-controls': settings.sTableId,
                                  'tabindex': settings.iTabIndex,
                                  'id': idx === 0 && typeof button === 'string' ?
                                      settings.sTableId + '_' + button : null
                              })
                              .append(jQuery('<a>', {
                                      'href': '#'
                                  })
                                  .html(btnDisplay)
                              )
                              .appendTo(container);

                          settings.oApi._fnBindAction(
                              node, {
                                  action: button
                              }, clickHandler
                          );
                      }
                  }
              }
          };

          attach(
              jQuery(host).empty().html('<ul class="pagination"/>').children('ul'),
              buttons
          );
      };

      // TableTools Bootstrap compatibility - Required TableTools 2.1+
      if ($DataTable.TableTools) {
          // Set the classes that TableTools uses to something suitable for Bootstrap
          jQuery.extend(true, $DataTable.TableTools.classes, {
              "container": "DTTT btn-group",
              "buttons": {
                  "normal": "btn btn-default",
                  "disabled": "disabled"
              },
              "collection": {
                  "container": "DTTT_dropdown dropdown-menu",
                  "buttons": {
                      "normal": "",
                      "disabled": "disabled"
                  }
              },
              "print": {
                  "info": "DTTT_print_info"
              },
              "select": {
                  "row": "active"
              }
          });

          // Have the collection use a bootstrap compatible drop down
          jQuery.extend(true, $DataTable.TableTools.DEFAULTS.oTags, {
              "collection": {
                  "container": "ul",
                  "button": "li",
                  "liner": "a"
              }
          });
      }
      jQuery('button[data-action=datatable-search]').click(function () {

          jQuery(dataTableSelector).DataTable().ajax.reload();
      });
      jQuery('button[data-action=datatable-selall]').click(function () {

          jQuery(dataTableSelector + " input[data-action=datatable-rowselect]").prop("checked", !jQuery(jQuery(dataTableSelector + " input[data-action=datatable-rowselect]")[0]).is(':checked'));
          if (jQuery(jQuery(dataTableSelector + " input[data-action=datatable-rowselect]")[0]).is(':checked'))
              jQuery(dataTableSelector + " input[data-action=datatable-rowselect]").parents('tr').addClass("active");
          else jQuery(dataTableSelector + " input[data-action=datatable-rowselect]").parents('tr').removeClass("active");
      });

      // jQuery('button[data-action=datatable-deletesel]').click(function() {
      //     var seldatas = jQuery(dataTableSelector).DataTable().rows(
      //         jQuery(dataTableSelector + " input[data-action=datatable-rowselect]:checked").parents('tr')).data();
      //     deletepostdata = [];
      //     jQuery.each(seldatas, function(i, v) {
      //         deletepostdata.push(v.id)
      //     });
      //     if (deletepostdata.length > 0)
      //         jQuery("#modal-deletecheck").modal('show')

      // });
      // jQuery(dataTableSelector).delegate('button[data-action=datatable-delete]', "click", function() {
      //     //删除某个
      //     var id = (jQuery(dataTableSelector).DataTable().row($(this).parents('tr')).data().id);
      //     deletepostdata = [];
      //     deletepostdata.push(id);
      //     jQuery("#modal-deletecheck").modal('show')



      // });
      //修改aside信息
        function getDetail(cb){
			$.get("all.json",function(res){
				if(res.errno==0){
					cb(res.data);
				}
			})
		}
		var attr;
		jQuery("#side-overlay").delegate(".changeBtn","click",function(){
			var self = $(this);
			getDetail(function(data){
				var ul = self.siblings(".changeUl");
				attr = ul[0].id;
				ul.empty();
				
                for(var i in data[attr]){
                    ul.append('<li><a href="javascript:void(0)">'+data[attr][i]+'</a></li>');
                }
			});
		});
		jQuery("#side-overlay").delegate(".changeUl li>a","click",function(){
			var value=$(this).text();
            jQuery("#side-overlay input[name='"+attr+"']").val(value);
		});


      jQuery(dataTableSelector).delegate('button[data-action]', "click", function () {
          //编辑某个
          var id = (jQuery(dataTableSelector).DataTable().row($(this).parents('tr')).data().DT_RowId);
          if (actions)
              actions.onclick($(this).attr("data-action"), id);
      });
      jQuery(dataTableSelector).delegate('input[data-action=datatable-rowselect]', "click", function () {

          ($(this).parents('tr').hasClass("active")) ? ($(this).parents('tr').removeClass("active")) : ($(this).parents('tr').addClass("active"))
      });
      if (actions && actions.items && actions.items.length > 0) {
          columns.push({
              data: "action",
              orderable: false
          })

      }

      jQuery('.js-dataTable-full-pagination').dataTable({
          pagingType: "full_numbers",
          searching: false,
          columns: columns,
          pageLength: 10,
          lengthMenu: [
              [5, 10, 15, 20],
              [5, 10, 15, 20]
          ],
          "processing": true,
          "serverSide": true,
          "ajax": {
              url: url,
              type: "get",
              data: function (d) {
                  jQuery('input[data-action=datatable-searchval],select[data-action=datatable-searchval]').each(function (i, v) {
                      if (jQuery(v).val() == "") return;
                      if (jQuery(v).is("select") && jQuery(v).val() == -1) return;
                      var searchName = jQuery(v).attr("name");
                      searchName = searchName.split(".$")
                      for (var i = 0; i < d.columns.length; i++) {

                          if (d.columns[i].data == searchName[0]) {
                              if (searchName.length < 2) {
                                  d.columns[i].search.value = jQuery(v).val();
                                  d.columns[i].search.regex = jQuery(v).attr("data-search-regex") == "true";
                              } else {
                                  d.columns[i].search.regex = false;
                                  if (d.columns[i].search.value == "") d.columns[i].search.value = JSON.stringify({});
                                  var vl = JSON.parse(d.columns[i].search.value);
                                  var val = jQuery(v).val();
                                  if (jQuery(v).parents("div").hasClass("input-daterange")) {
                                      val = new Date(val);
                                      val = new Date(val.getFullYear(), val.getMonth(), val.getDate());
                                  }
                                  d.columns[i].search.value = JSON.stringify($.extend({}, vl, JSON.parse("{\"$" + searchName[1] + "\":\"" + val + "\"}")));
                              }


                              break;
                          }


                      }

                  });
                  d.search.value = {};
                  jQuery('input[data-action=datatable-searchglobalval],select[data-action=datatable-searchglobalval]').each(function (i, v) {
                      d.search.value[jQuery(v).attr('name')] = jQuery(v).val();

                  });
                  return d;

              },
              dataSrc: function (json) {
                
                  for (var i = 0, ien = json.data.length; i < ien; i++) {
                      var str = "";
                      if (actions && actions.items) {
                          $(actions.items).each(function (i, v) {
                              str = str + '<button class="btn btn-xs btn-default" style="width: 100%;" type="button" data-toggle="layout" data-action="side_overlay_toggle"\
                        title="' + v.title + '"  data-action="' + v.name + '">详情</button>';
                          })
                          json.data[i].action = str;
                      }
                      json.data[i].DT_RowId = json.data[i].id;

                    //   for(var j in json.data[i]){
                    //       if(j=="carId"){
                    //           html[j] += '<option value="'+json.data[i][j]+'">'+json.data[i][j]+'</option>';
                    //           $('.search-group select[name="'+j+'"]').append(html[j]);
                    //       }
                    //   }
                  }
                  
                  return json.data;
              }
          }

      });
      $("#side-overlay form").submit(function () {
          var data = $(this).serialize();
          $[$(this).attr("method")]($(this).attr("action"), data, function (res) {
              if (res.errno == 0 && res.data != null) {
                  alert("数据保存成功");
                  var tr = $("#side-overlay").data("target");
                  if (tr == "") {
                      $(dataTableSelector).DataTable().draw();
                      return;
                  }
                  var dtdata = $(dataTableSelector).DataTable().row(tr).data();
                  for (var key in dtdata) {
                      if (res.data[key] != undefined) {
                          dtdata[key] = res.data[key];
                      }
                  }
                  $(dataTableSelector).DataTable().row(tr).data(dtdata);
              }
          })
          return false

      })
      jQuery(dataTableSelector).delegate('[data-toggle="layout"]', 'click', function () {
          var table = $(dataTableSelector).DataTable();
          var tr = $(this).parents("tr");
          var side = $("#side-overlay");

          $(".block-title", side).text(table.row(tr).data().DT_RowId);
          $.get("2.json", {
              id: table.row(tr).data().DT_RowId
          }, function (res) {
              if (res.errno == 0) {
                  var data = res.data;
                  
                  $("input,select,textarea", side).each(function () {
                      var type = $(this).attr("type");
                      var name = $(this).attr("name");

                      var value = data;
                      var namelist = name.split("|");
                      $(namelist).each(function (i, v) {
                          value = data;
                          var slist = v.split(".");
                          var isfind = true;
                          $(slist).each(function (j, s) {
                              if (value[s] == undefined) {
                                  isfind = false;
                                  return false;
                              }
                              value = value[s];
                          });
                          if (isfind) {
                              return false;
                          }
                      })

                      if (type == "datetime") {
                          $(this).val((new Date(value)).Format("yyyy-MM-dd hh:mm:ss"));
                      }else if(type == 'dateMonth'){
                          $(this).val((new Date(value)).Format("yyyy-MM"));
                      }else {
                          if (type == "checkbox") {
                              $(this).prop("checked", value);
                          } else {
                              $(this).val(value);
                              if ($(this).is("select")) {
                                  $(this).change();
                              }
                          }
                      }

                  })
                  side.data("target", tr);
                  App.layout('side_overlay_toggle');
              } else {
                  alert("数据获取失败");
              }
          })



      });
  };