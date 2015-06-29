Responsive Shopify images with the `srcset` attribute
===

Drop these Liquid snippets into your Shopify theme to generate responsive product and collection images.

Quick Start
---

Copy `product-image-srcset.liquid` to your theme's `snippets` folder and include it wherever a product image should display:

    {% include 'product-image-srcset' %}

That will output:

    <img src="//cdn.shopify.com/.../products/IMG_medium.jpg"
      srcset="
        //cdn.shopify.com/.../products/IMG_small.jpg     100w,
        //cdn.shopify.com/.../products/IMG_compact.jpg   160w,
        //cdn.shopify.com/.../products/IMG_medium.jpg    240w,
        //cdn.shopify.com/.../products/IMG_large.jpg     480w,
        //cdn.shopify.com/.../products/IMG_grande.jpg    600w,
        //cdn.shopify.com/.../products/IMG_1024x1024.jpg 1024w"
      sizes="100vw"
      alt="Product title"
    />
