/**
#
#Copyright (c) 2010-2018 Razortooth Communications, LLC. All rights reserved.
#
#Redistribution and use in source and binary forms, with or without modification,
#are permitted provided that the following conditions are met:
#
#    * Redistributions of source code must retain the above copyright notice,
#      this list of conditions and the following disclaimer.
#
#    * Redistributions in binary form must reproduce the above copyright notice,
#      this list of conditions and the following disclaimer in the documentation
#      and/or other materials provided with the distribution.
#
#    * Neither the name of Razortooth Communications, LLC, nor the names of its
#      contributors may be used to endorse or promote products derived from this
#      software without specific prior written permission.
#
#THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
#ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
#WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
#DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
#ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
#(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
#LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
#ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
#(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
#SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

// XXX This technique borrowed from busterjs, unfortunately requires a commonJS module loader
/*
if (typeof require == "function" && typeof module == "object") {
    // buster = require("buster");
    CONFIG = require("./config.json");
}
*/

var VERSION = "0.2.1"
var BROWSER_WINDOW_REF; // XXX NOT USED IF WE DON'T POP UP MENUS
var FS_HANDLE; // XXX We store this but don't use it
var FS_ACTIVATE = false;
var FAKEWAKE_INTERVAL = 20000; // XXX For now hardcode this in.
var LOOP_INTERVAL;

// Boilerplate for FS Filesystem from HTML5rocks http://www.html5rocks.com/en/tutorials/file/filesystem
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.URL = window.URL || window.webkitURL;

function fsErrorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };
  console.log('Error: ' + msg);
  alert('Error: ' + msg);
}

function doWriteFS(fileEntry) {
  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function(e) {
      console.log('Write completed.');
    };

    fileWriter.onerror = function(e) {
      console.log('Write failed: ' + e.toString());
    };

    // Create a new date object Blob and write it to our log file
    var blob = new Blob([new Date() + "<br />"], {type: 'text/plain'});
    fileWriter.seek(fileWriter.length); // Start write at EOF
    fileWriter.write(blob);

  }, fsErrorHandler);
}

function doReadFS(fs) {
  fs.root.getFile(CONFIG.logfile, {}, function(fileEntry) {
    // $('#status').append('dump fs: ' + fs.name);
    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
       var reader = new FileReader();
       reader.onloadend = function(e) {
        $("#logoutput").append(this.result);
       };
       reader.readAsText(file);
    }, fsErrorHandler);
  }, fsErrorHandler);
}

function onInitFs(fs) {
  // FS_HANDLE = fs;
  fs.root.getFile(CONFIG.logfile, {create: true}, doWriteFS, fsErrorHandler);
  console.log('opened fs: ' + fs.name);
  // $('#status').append('opened fs: ' + fs.name);
}

function onAppendFs(fs) {
  fs.root.getFile(CONFIG.logfile, {}, doWriteFS, fsErrorHandler);
  console.log('append to fs: ' + fs.name);
  // $('#status').append('append to fs: ' + fs.name)
}

// Call this once to create FS handle
if (FS_ACTIVATE) {
    window.requestFileSystem(window.PERMANENT, 1024*1024, onInitFs, fsErrorHandler);
}

/** From EpochEDU project **/
function openNewWindow(url, options) {
  var awindow;
  if (options) {
    awindow = window.open(url, "player", options);
  } else {
    awindow = window.open(url);
  }
  return awindow;
}

/** From EpochEDU project **/
function closeBrowserWindow(windowref) {
  if (windowref) {
    windowref.close(); // XXX Is there a better way to detect?
  }
}

/** From EpochEDU project **/
function reloadURL() {
	window.location.reload();
}

function fireTimedWindow(target, timeout) {
  if (!target) return false;
	BROWSER_WINDOW_REF = openNewWindow(target);
}

function fslog(msg) {
    if (FS_ACTIVATE) {
        window.requestFileSystem(window.PERMANENT, 1024*1024, onAppendFs, fsErrorHandler);
    }
}

function genRandomQuery() {
   var rnum = '?r+'+Math.round(Math.random()*10000);
   console.log('genRandomQuery = ' + rnum);
   return rnum;
}

function resizeIframe() {
  var scroll_h = document.getElementById('displaywindow').contentWindow.document.body.scrollHeight;

  //change the height of the iframe
  document.getElementById('displaywindow').height= scroll_h;
}

function setNoConnection() {
  $('#status').append(" - <em>No Wifi/Wireless Connection</em>");
}

$(document).ready(function() {
    $('#status').append('Tinytibjs v' + VERSION);
	$(".pagerc").click(function(evt) {
		if (evt.target) {
      BROWSER_WINDOW_REF = openNewWindow(evt.target);
		}
		return false;
	});

  $("#logdump").click(function(evt) {
    // alert("dump log");
    if (FS_ACTIVATE) {
        window.requestFileSystem(window.PERMANENT, 1024*1024, doReadFS, fsErrorHandler);
    }
    return false;
  });

  $("#clear").click(function(evt) {
    $("#status").empty();
    $("#errors").empty();
    $("#logoutput").empty();
    return false;
  });

  $("#wakeup").click(function(evt) {
    alert('clicked on wakeup');
    $('#clear').trigger('click');
    return false;
  });

  $("#halt").click(function(evt) {
    alert('Halting test loops');
    clearInterval(LOOP_INTERVAL);
    return false;
  });

  $("#resetlog").click(function(evt) {
    alert("reset log");
    if (FS_ACTIVATE) {
        window.requestFileSystem(window.PERMANENT, 1024*1024, function(fs) {
            fs.root.getFile(CONFIG.logfile, {create: false}, function(fileEntry) {
            fileEntry.remove(function() {
            console.log('File removed.');
            }, fsErrorHandler);
          }, fsErrorHandler);
        }, fsErrorHandler);
    }

    return false;
  });

  $("#timestamp").append(new Date());
  $("#config").append(JSON.stringify(CONFIG));

  if (CONFIG.fakewake) {
    setInterval(function() {
        $('#wakeup').trigger('click');
        console.log("Clicked the wakeup button at " + new Date());
    }, FAKEWAKE_INTERVAL);
  }

  if (CONFIG.hidecontrols) {
    $('#controls').hide();
  }

  if (CONFIG.hidestatus) {
    $('#status').hide();
  }
  if (CONFIG.autostart) {
    // XXX Technically this can bomb if number of tests don't match our URLs
    var i = 1;

    setTimeout(function() {
        $('#displaywindow').attr('src', CONFIG["testcase-1"] + genRandomQuery());
        i = i+1;
    }, CONFIG.warmup);

    LOOP_INTERVAL = setInterval(function() {
      if (BROWSER_WINDOW_REF) {
        closeBrowserWindow(BROWSER_WINDOW_REF);
      }

      console.log('loop to testcase ' + i);

      // BROWSER_WINDOW_REF = openNewWindow(CONFIG["testcase-" + i]);
      $('#displaywindow').attr('src', (CONFIG["testcase-" + i] + genRandomQuery()));
      fslog("timestamp");

      if (i == CONFIG.numberoftests) {
        i = 1;
      } else {
        i = i+1;
      }
    }, CONFIG.timeout);
  } else {
    alert("Implement manual loop startup");
  }
});
