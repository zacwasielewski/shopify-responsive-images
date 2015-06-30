var ShopifyResponsiveImages = (function( window, undefined ) {

  function load() {
    ready(init);
    window.addEventListener('load', function() {
      triggerPictureFill();
    }, false);
  }

  function init() {
    var images = document.querySelectorAll('img[data-js-scale-srcset]');
    forEach(images, function(index, img) {
      img.addEventListener('load', function() {
        scaleSrcset(this);
      }, false);
    });
  }

  function scaleSrcset(img) {
    var srcset,
        srcset_orig,
        srcset_json,
        scale = img.naturalWidth / img.naturalHeight,
        is_portrait = (scale < 1);

    if (!is_portrait) { return; }
    if (!img.getAttribute('data-js-scale-srcset')) { return; }

    // parse the original srcset attribute into a JSON object
    srcset_orig = img.getAttribute('srcset') || (img.picturefill || {}).srcset;
    srcset_json = srcsetToJSON(srcset_orig);

    // scale srcset sizes and convert back to a string
    srcset = srcset_json.map(function(rule) {
      return scaleSrcsetRule(rule, scale);
    }).join(',');

    img.setAttribute('srcset', srcset);
    img.setAttribute('data-js-scale-srcset', false); // prevent rescaling if <img> load event is triggered again
    triggerPictureFill(img);
  }

  function triggerPictureFill(img) {
    if (typeof picturefill === 'undefined') { return; }
    if (img) {
      picturefill({ reevaluate: true, elements: [img] });
    } else {
      picturefill({ reevaluate: true });
    }
  }

  function srcsetToJSON() {
    return srcset_orig.split(',').map(function(rule){
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
