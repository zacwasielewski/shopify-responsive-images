Responsive Shopify images with the `srcset` attribute
===

Drop these Liquid snippets into your Shopify theme to generate responsive product and collection images.

Quick start
---

Copy `product-image-srcset.liquid` to your theme's `snippets` folder and include it wherever you would normally include a product image:

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

Advanced usage
---

The snippet above is fine, but you'll get better results by estimating how much real estate your images will need at specific screen sizes.

Assuming you have a typical responsive product grid which changes its layout depending on the browser size:

| Screen size | Grid columns | % of browser width |
|--------|--------------|--------------------|
|Mobile (<= 480px)|1|100%|
|Tablet (> 480px and <= 768px)|2|50%|
|Desktop (> 768px)|4|25%|

You would give the `sizes` option this list of media queries (`vw` stands for viewport width):

    {% include 'product-image-srcset',
       sizes: '(max-width: 480px) 100vw, (min-width: 481px) and (max-width: 768px) 50vw, 25vw'%}

More about `srcset` and `sizes`:
  - https://dev.opera.com/articles/native-responsive-images/

FAQ
---

- **Why should I use responsive images?**

  Your site will load faster. The user's web browser chooses the most appropriate image size for the device, so users on small screens don't waste time downloading high-resolution images for desktops. http://alistapart.com/article/responsive-images-in-practice

- **What's up with that chunk of Javascript?**

  Shopify doesn't tell us the width of an image, only the length of the image's *longest side*. But `srcset` needs to know an image's width to work accurately. So as a workaround, that bit of Javascript analyzes the image as soon as it loads, determine its actual width, and updates the srcset attribute.

TODO
---
