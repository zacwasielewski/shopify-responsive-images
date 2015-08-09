var ShopifyResponsiveImages = (function( window, undefined ) {

  var sizes = {
    "small":      100,
    "compact":    160,
    "medium":     240,
    "large":      480,
    "grande":     600,
    "1024x1024":  1024
  };

  function load() {
    ready(init);
  }

  function init() {
    var images = document.querySelectorAll('img[data-js-responsive]');
    forEach(images, function(index, img) {
      img.addEventListener('load', function() {
        var scaledImage = scaleImgSrcset(this);
        //triggerPictureFill(scaledImage);
      }, false);
    });
    window.addEventListener('load', function() {
      //triggerPictureFill();
    }, false);
  }

  function scaleImgSrcset(img) {
    var srcset,
        srcset_orig,
        srcset_json,
        ratio = img.naturalWidth / img.naturalHeight,
        scale = getImageScale(img),
        is_portrait = (ratio < 1);

    if (!is_portrait) { return; }
    if (img.getAttribute('data-js-srcset-scaled') === 'true') { return; }

    // parse the original srcset attribute into a JSON object
    srcset_orig = img.getAttribute('srcset') || (img.picturefill || {}).srcset;
    srcset_json = srcsetToJSON(srcset_orig);

    // scale srcset sizes and convert back to a string
    srcset = srcset_json.map(function(rule) {
      return scaleSrcsetRule(rule, scale);
    }).join(',');

    img.setAttribute('srcset', srcset);
    img.setAttribute('data-js-srcset-scaled', 'true'); // prevent rescaling if <img> load event is triggered again

    return img;
  }

  function triggerPictureFill(img) {
    if (typeof picturefill === 'undefined') { return; }
    if (img) {
      picturefill({ reevaluate: true, elements: [img] });
    } else {
      picturefill({ reevaluate: true });
    }
  }

  function getImageScale(img) {

    var longest_edge = Math.max(img.naturalWidth, img.naturalHeight);
    for (var key in sizes) {
      var size = sizes[key];
      if (img.src.indexOf( "_" +key+ "." )) {
        if (size > longest_edge) {
          return longest_edge / size;
        }
      }
    }
    return 1;
  }

  function srcsetToJSON(srcset) {
    return srcset.split(',').map(function(rule){
      return rule.trim().split(/\s+/).map(function(s) { return s.trim(); });
    });
  }

  function scaleSrcsetRule(rule, scale) {
    var url = rule[0],
        width = parseInt(rule[1].slice(0,-1));
    if (width > 160) { width = Math.floor(width * scale); } // don't scale square thumbnails
    return [url, width.toString()+"w"].join(" ");
  }

  // Utility methods

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  }

  // Public methods

  return {
    load: load
  };

})( window );

ShopifyResponsiveImages.load(); // undefined
