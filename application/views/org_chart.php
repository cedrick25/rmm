<?php $this->load->view('templates/header.php'); ?> 

<style type="text/css">
    #chart-container {
    font-family: Arial;
    height: 420px;
    border: 2px dashed #aaa;
    border-radius: 5px;
    overflow: auto;
    text-align: center;
}
.orgchart.edit-state .edge {
  display: none;
}
/* .orgchart .node .title {
  height: 100%;
  line-height: 20px;
} */
#edit-panel {
  margin: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #aaa;
}
#edit-panel .btn-inputs {
  width: 2rem;
  padding: 0;
  font-size: 1.5rem;
}
#edit-panel .btn-inputs {
  vertical-align: sub;
}
#edit-panel.edit-parent-node .btn-inputs {
  display: none;
}
#edit-panel.edit-state > :not(#chart-state-panel) {
  display: none;
}
#edit-panel label {
  font-weight: bold;
}
#edit-panel.edit-parent-node .selected-node-group .selected-node-content-group {
  display: none;
  white-space: pre-wrap;
}
#chart-state-panel,
#selected-node,
#btn-remove-input {
  margin-right: 1rem;
}
#edit-panel button,
#edit-panel input {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}
#edit-panel.edit-parent-node button:not(#btn-add-nodes) {
  display: none;
}
/*#new-nodelist {
/*  display: inline-block;*/
/*  list-style: none;*/
/*  margin-top: -0.5rem;
  padding: 0;
  vertical-align: text-top;*/
}
/*#new-nodelist > * {*/
/*  padding-bottom: 4px;*/
/*}*/
.radio-panel input[type="radio"] {
  height: 1.25rem;
  width: 1.25rem;
  vertical-align: text-bottom;
}
#btn-add-nodes {
  margin-left: 20px;
}

.orgchart {
  background: #fff;
}

</style>
<body>
    <div class="layout-wrapper layout-2">
        <div class="layout-inner">

            <!-- left panel --> 
            <?php $this->load->view('templates/left-panel.php'); ?>
            <!-- left panel end -->

                <div class="layout-container">
                    <!-- header -->
                    <?php $this->load->view('templates/avatar.php'); ?>
                    <!-- header end -->

                        <!-- right panel -->
                        <div class="layout-content"> 
                            <div class="container-fluid flex-grow-1 container-p-y">
                                <h4 class="font-weight-bold py-3 mb-0"> Organization Chart </h4>
                                <div class="text-muted small mt-0 mb-4 d-block breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="dashboard"><i class="feather icon-home"></i> Dashboard</a></li>
                                        <li class="breadcrumb-item active"><span class="feather icon-user"></span> Organization Chart </a></li>
                                    </ol>
                                </div>
                                <div class="card">
                                    <div class="card-header with-elements">
                                        <h6 class="card-header-title mb-0">Organization Chart</h6>
                                    </div>
                                    <div class="card-body">
                                        
                                        <span id="chart-export-panel" class="radio-panel">
                                            <input type="radio" name="chart-export" id="rd-png" value="png" checked="true"><label for="rd-png">PNG</label>
                                            <input type="radio" name="chart-export" id="rd-pdf" value="pdf"><label for="rd-pdf">PDF</label>
                                            <input type="radio" name="chart-export" id="rd-json" value="json"><label for="rd-json">JSON</label>
                                        </span>
                                        <button type="button" class="btn btn-info waves-effect" id="btn-export">Export</button>
                                        <div id="edit-panel">
                                            <span id="chart-state-panel" class="radio-panel">
                                                <input type="radio" name="chart-state" id="rd-view" value="view" class=""><label for="rd-view">View</label>
                                                <input type="radio" name="chart-state" id="rd-edit" value="edit" class="" checked="true"><label for="rd-edit">Edit</label>
                                            </span><br>
                                            <div class="form-row">
                                                <div class="form-group col-md-4">
                                                    <label class="form-label selected-node-group">Selected Name:</label>
                                                    <input type="text" id="selected-node" class="selected-node-group form-control" placeholder="Name">
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="form-group col-md-4">
                                                    <label class="form-label selected-node-content-group">Selected Position:</label>
                                                    <input type="text" id="selected-node-content" class="selected-node-group form-control" placeholder="Position">
                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="form-row col-md-3">
                                                    <div class="form-group demo-inline-spacing mt-3">
                                                        <button type="button" class="btn btn-sm btn-info waves-effect" id="btn-edit-selected-node">Edit</button>
                                                        <button type="button" class="btn btn-sm btn-secondary waves-effect" id="btn-delete-nodes">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- <label class="selected-node-group">Selected Name:</label>
                                            <input type="text" id="selected-node" class="selected-node-group" placeholder="Name">

                                            <label class="selected-node-content-group">Selected Position:</label>
                                            <input type="text" id="selected-node-content" class="selected-node-content-group" placeholder="Position">
                                            <button type="button" id="btn-edit-selected-node">Edit</button>
                                            <button type="button" id="btn-delete-nodes">Delete</button> -->
                                            <div class="form-row" id="new-nodelist">
                                                <div class="form-group col-md-8" id="fieldsNew">
                                                    <div class="form-row" id="inputFields">
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">New Name:</label>
                                                            <input type="text" class="new-node form-control" placeholder="New Name">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                        <div class="form-group col-md-6">
                                                            <label class="form-label">New Position:</label>
                                                            <input type="text" class="new-node-content form-control" placeholder="New Position">
                                                            <div class="clearfix"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-row col-md-3">
                                                    <div class="form-group demo-inline-spacing mt-3">
                                                        <button type="button" class="btn btn-sm btn-info waves-effect btn-inputs" id="btn-add-input">+</button>
                                                        <button type="button" class="btn btn-sm btn-secondary waves-effect btn-inputs" id="btn-remove-input">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-row">
                                                <span id="node-type-panel" class="radio-panel">
                                                    <input type="radio" name="node-type" id="rd-parent" value="parent"><label for="rd-parent">Parent(root)</label>
                                                    <input type="radio" name="node-type" id="rd-child" value="children"><label for="rd-child">Child</label>
                                                    <input type="radio" name="node-type" id="rd-sibling" value="siblings"><label for="rd-sibling">Sibling</label>
                                                </span>
                                            </div>
                                            <div class="form-row">
                                                <div class="form-group demo-inline-spacing mt-3">
                                                    <button type="button" class="btn btn-sm btn-info waves-effect" id="btn-add-nodes">Add</button>
                                                    <button type="button" class="btn btn-sm btn-secondary waves-effect" id="btn-reset">Reset</button>
                                                </div>
                                            </div>
                                            <!-- <ul id="new-nodelist"> -->
                                                <!-- <li><label>New Name:</label><input type="text" class="new-node" placeholder="New Name"><label>New Position:</label><input type="text" class="new-node-content" placeholder="New Position"></li> -->
                                            <!-- </ul> -->
                                            <!-- <button class="btn-inputs" id="btn-add-input">+</button>
                                            <button class="btn-inputs" id="btn-remove-input">-</button> -->
                                            <!-- <span id="node-type-panel" class="radio-panel">
                                                <input type="radio" name="node-type" id="rd-parent" value="parent"><label for="rd-parent">Parent(root)</label>
                                                <input type="radio" name="node-type" id="rd-child" value="children"><label for="rd-child">Child</label>
                                                <input type="radio" name="node-type" id="rd-sibling" value="siblings"><label for="rd-sibling">Sibling</label>
                                            </span>
                                            <button type="button" id="btn-add-nodes">Add</button>
                                            <button type="button" id="btn-reset">Reset</button> -->
                                        </div>
                                        <div id="chart-container"></div>
                                            
                                        </div>
                                </div>
                            </div>                
                        </div>
                    <!-- right panel end -->

                </div>
        </div>
    </div>

    <!-- right panel end -->


    <?php $this->load->view('templates/footer.php'); ?> 
    <script src="assets/js/org_chart.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
    <script src="assets/js/html2canvas.min.js"></script>
    <script src="assets/js/jquery.orgchart.min.js"></script>
    <script src="assets/js/jspdf.min.js"></script>
    <script type="text/javascript">
        org_chart();
    </script>
</body>
</html>
