var org_chart = function(){

    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    
    __executeExternalGet('8088/org/list').done(function (result) {
        console.log(result)
        if (result.status != "ERROR") {
            if (result.length > 0) {
                result.forEach(function(data){

                });
            }else{
            console.log("no data org");
            }
        } else {
            console.log("failed fetching org");
        }
    })

    // var payload = {
    //         "position": "test",
    //         "rank": "1",
    //         "name": "asd",
    //         "parentId": 0,
    //         "status": true
    //     }
    // console.log(payload);
    // __executeExternalPost('8088/org/new',JSON.stringify(payload)).done(function (result) {
    //     console.log(result);
    //     if (result.status != "ERROR") {

    //     }else{
    //         console.log(result.status);
    //         // alert(result.message)
    //     }
    // })

    $(function () {
        var datascource = {
          name: "Johny seen zone",
          title: "CEO",
          band: "SCS2",
          children: [
            {
              name: "Shinji",
              title: "Boss amo",
              band: "Band 1",
              children: [
                {
                  name: "James",
                  title: "Assasin",
                  division: "PFPD",
                  band: "Band 2"
                },
                {
                  name: "MJ",
                  title: "Assasin",
                  division: "PFPD",
                  band: "Band 2",
                }
              ]
            },
            {
              name: "Moja",
              title: "Boss amo",
              division: "PFPD",
              band: "Band 1",
              children: [
                {
                  name: "Ced",
                  title: "Kain lang ako sir",
                  division: "PFPD",
                  band: "Band 1"
                },
                {
                  name: "Sel",
                  title: "Palag na yan",
                  division: "PFPD",
                  band: "Band 1"
                },
                {
                  name: "Lance",
                  title: "PM is the key",
                  division: "PFPD",
                  band: "Band 1"
                },
              ]
            },
          ]
        };

        var getId = function () {
          return new Date().getTime() * 1000 + Math.floor(Math.random() * 1001);
        };

        var nodeTemplate = function (data) {
          //<span class="id">${data.id}</span>
          //<div class="content">${data.title}<br>${data.division}</div>

          directReports = "";
          // if(data.children !== undefined && data.children !== null) {
          //   directReports = data.children.length;
          // };

          return `
              <div class="title">${data.name} ${directReports}</div>
              <div class="content">${data.title}</div>
            `;
        };

        var oc = $("#chart-container").orgchart({
          data: datascource,
          nodeTemplate: nodeTemplate,
          nodeTitle: "name",
          nodeId: "id",
          nodeContent: "title",
          //'exportButton': true,
          //'exportFilename': 'PostsOrgChart',
          //'exportFileextension': 'png',
          //'parentNodeSymbol': 'fa-users',
          pan: true,
          zoom: true,
          draggable: true,
          // dropCriteria: function ($draggedNode, $dragZone, $dropZone) {
          //   if (
          //     $draggedNode.find(".content").text().indexOf("manager") > -1 &&
          //     $dropZone.find(".content").text().indexOf("engineer") > -1
          //   ) {
          //     return false;
          //   }
          //   return true;
          // },
          createNode: function ($node, data) {
            $node[0].id = getId();
            //console.log($node[0].children.length);

            //Mouse doubleclick
            $node.on("dblclick", function () {
              self.Data.SelectTextsInColumn(1, false, data.path);
            });

            // $node.on('click', function() {
            //   alert(data.name + ' - ' + data.title);
            // });
          }
        });

        $("#btn-export").on("click", function () {
          $("#btn-reset").click(); //clears any highlighted nodes
          exportFilename = "PostsOrgChart.json";
          exportFileExtnesion = $("[id$='chart-export-panel']")
            .find(":checked")
            .val();

          if (exportFileExtnesion == "json") {
            var hierarchy = oc.getHierarchy("True");
            var tree = JSON.stringify(hierarchy);
            download(tree, exportFilename, "text/plain");
          } else {
            oc.export(exportFilename, exportFileExtnesion);
          }
        });

        oc.$chartContainer.on("click", ".node", function () {
          var $this = $(this);
          $("#selected-node").val($this.find(".title").text()).data("node", $this);
          $("#selected-node-content")
            .val($this.find(".content").html())
            .data("node", $this);

          //alert($this.find('.title').text() + ' ' + $this.find('.content').text());
        });

        oc.$chartContainer.on("click", ".orgchart", function (event) {
          if (!$(event.target).closest(".node").length) {
            $("#selected-node").val("");
            $("#selected-node-content").val("");
          }
        });

        $('input[name="chart-state"]').on("click", function () {
          $(".orgchart").toggleClass("edit-state", this.value !== "view");
          $("#edit-panel").toggleClass("edit-state", this.value === "view");
          if ($(this).val() === "edit") {
            $(".orgchart")
              .find(".hidden")
              .removeClass("hidden")
              .end()
              .find(".hierarchy")
              .removeClass(
                "isCollapsedDescendant isChildrenCollapsed isSiblingsCollapsed isCollapsedSibling"
              )
              .find(".node")
              .removeClass("slide-up slide-down slide-right slide-left");
          } else {
            $("#btn-reset").trigger("click");
          }
        });

        $('input[name="node-type"]').on("click", function () {
          var $this = $(this);
          if ($this.val() === "parent") {
            $("#edit-panel").addClass("edit-parent-node");
            $("#fieldsNew").children(":gt(0)").remove();
          } else {
            $("#edit-panel").removeClass("edit-parent-node");
          }
        });

        // $("#btn-add-input").on("click", function () {
        //   $("#new-nodelist").append(
        //     '<li><label>new node:</label><input type="text" class="new-node" placeholder="New PostID"><label>new node content:</label><input type="text" class="new-node-content" placeholder="New Content"></li>'
        //   );
        // });

        // $("#btn-remove-input").on("click", function () {
        //   var inputs = $("#new-nodelist").children("div .form-group");
        //   if (inputs.length > 1) {
        //     inputs.last().remove();
        //   }
        // });
        $("#btn-add-input").click(function() {
            var inputFieldsClone = $("#inputFields").clone();
            inputFieldsClone.find('input').val(''); // Clear input values in the cloned fields
            $("#fieldsNew").append(inputFieldsClone);
        });

        $("#btn-remove-input").click(function() {
            var inputFields = $("#fieldsNew").find(".form-row");
            if (inputFields.length > 1) {
                inputFields.last().remove();
            }
        });

        $("#btn-add-nodes").on("click", function () {
          var $chartContainer = $("#chart-container");
          var nodeVals = [];
          var nodeValsContent = [];
          $("#new-nodelist")
            .find(".new-node")
            .each(function (index, item) {
              var validVal = item.value.trim();
              if (validVal.length) {
                nodeVals.push(validVal);
              }
            });
          $("#new-nodelist")
            .find(".new-node-content")
            .each(function (index, item) {
              var validValCont = item.value.trim();
              if (validValCont.length) {
                nodeValsContent.push(validValCont);
              }
            });
          console.log(nodeVals);
          console.log(nodeValsContent);
          var $node = $("#selected-node").data("node");
          if (!nodeVals.length) {
            alert("Please input value for new Name");
            return;
          }
          var nodeType = $('input[name="node-type"]:checked');
          if (!nodeType.length) {
            alert("Please select a type");
            return;
          }
          if (nodeType.val() !== "parent" && !$(".orgchart").length) {
            alert(
              "Please create the root firstly when you want to build up the orgchart from the scratch"
            );
            return;
          }
          if (nodeType.val() !== "parent" && !$node) {
            alert("Please select name in orgchart");
            return;
          }
          if (nodeType.val() === "parent") {
            if (!$chartContainer.children(".orgchart").length) {
              // if the original chart has been deleted
              oc = $chartContainer.orgchart({
                data: { name: nodeVals[0] },
                chartClass: "edit-state",
                exportButton: true,
                exportFilename: "PostsOrgChart",
                createNode: function ($node, data) {
                  $node[0].id = getId();
                }
              });
            } else {
              oc.addParent($chartContainer.find(".node:first"), {
                name: nodeVals[0],
                title: nodeValsContent[0],
                id: getId(),
                className: "new-parent"
              });
            }
          } else if (nodeType.val() === "siblings") {
            if ($node[0].id === oc.$chart.find(".node:first")[0].id) {
              alert(
                "You are not allowed to directly add sibling nodes to root node"
              );
              return;
            }
            oc.addSiblings(
                $node,
                (function () {
                    var siblings = [];
                    for (var i = 0; i < nodeVals.length; i++) {
                        siblings.push({
                            name: nodeVals[i],
                            title: nodeValsContent[i], // Use nodeValsContent value as title
                            relationship: "110",
                            id: getId(),
                            className: "new-sibling"
                        });
                    }
                    return siblings;
                })()
            );
          } else {
            if (!$node.siblings(".nodes").length) {
              var rel = nodeVals.length > 1 ? "110" : "100";
              oc.addChildren(
                $node,
                nodeVals.map(function (item) {
                  return {
                    name: item,
                    title: "child",
                    relationship: rel,
                    id: getId(),
                    className: "new-child"
                  }; //this is a new child node
                })
              );
            } else {
              oc.addSiblings(
                $node.siblings(".nodes").find(".node:first"),
                nodeVals.map(function (item) {
                  return {
                    name: item,
                    title: "child-sibling",
                    relationship: "110",
                    id: getId(),
                    className: "new-child-sibling"
                  }; //this is a new child sibling node
                })
              );
            }
          }
        });

        $("#btn-delete-nodes").on("click", function () {
          var $node = $("#selected-node").data("node");
          if (!$node) {
            alert("Please select name in orgchart");
            return;
          } else if ($node[0] === $(".orgchart").find(".node:first")[0]) {
            if (
              !window.confirm("Are you sure you want to delete the whole chart?")
            ) {
              return;
            }
          }
          oc.removeNodes($node);
          $("#selected-node").val("").data("node", null);
          $("#selected-node-content").val("").data("node", null);
        });

        $("#btn-reset").on("click", function () {
          $(".orgchart").find(".focused").removeClass("focused");
          $("#selected-node").val("");
          $("#selected-node-content").val("");
          // $("#new-nodelist")
          //   .find("input:first")
          //   .val("")
          //   .parent()
          //   .siblings()
          //   .remove();
          $(".new-node").val("");
          $(".new-node-content").val("");
          $("#node-type-panel").find("input").prop("checked", false);
        });

        $("#btn-edit-selected-node").on("click", function () {
          var $node = $("#selected-node").data("node");
          //console.log($node[0]);

          if (!$node) {
            alert("Please select name in orgchart");
            return;
          } else {
            //selected node content is this: $node.find(".title").text() + " " + $node.find(".content").text()
            //Need to replace with inputbox contents
            //console.log($("#selected-node").val());
            $(".node.focused .title").html($("#selected-node").val());
            $(".node.focused .content").html($("#selected-node-content").val());
          }
        });
    });
}
