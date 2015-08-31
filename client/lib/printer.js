this.Printer = (function() {
  var self = {};

  var toCSV = function(data) {
    var result = Papa.unparse(data);
    _downloadCSV(result);
  };

  var _downloadCSV = function(csv) {
		var blob = new Blob([csv]);
		var a = window.document.createElement("a");
	    a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
	    a.download = "Appontamentos.csv";
	    document.body.appendChild(a);
	    a.click();
	    document.body.removeChild(a);
	}

  return {
    toCSV: toCSV
  };
})();
