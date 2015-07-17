Responsive Shopify product images
===

Use this `.liquid` snippet in your Shopify theme to generate responsive product images.

Quick start
---

1. Copy `responsive-product-image.liquid` to your theme's `snippets/` folder and include it wherever you would normally include a product image:

  ```ruby
  {% include 'responsive-product-image' %}
  ```

2.  Copy `responsive-images.js` to `assets/` and include it with your other scripts (usually at the bottom of `theme.liquid`):

  ```ruby
  {{ 'responsive-images.js' | asset_url | script_tag }}
  ```

That will output:

```html
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
```

Advanced usage
---

The snippet above is fine, but you'll get better results by estimating how much real estate your images will occupy at specific screen sizes.

For example, let's assume your theme has a typical responsive product grid layout that changes depending on the browser size:

| Screen size | Grid columns | % of browser width |
|--------|--------------:|--------------------:|
|Mobile (<= 480px)|1|100%|
|Tablet (> 480px and <= 768px)|2|50%|
|Desktop (> 768px)|4|25%|

You would give the `sizes` option this list of media queries (`vw` stands for viewport width):

```ruby
{% include 'responsive-product-image',
  sizes: '(max-width: 480px) 100vw, (min-width: 481px) and (max-width: 768px) 50vw, 25vw'%}
```

More about `srcset` and `sizes`:
  - https://dev.opera.com/articles/native-responsive-images/

Options
---

| Option | Description | Default |
|--------|-------------|---------|
| `sizes` | Media queries describing how large the image  will be at various screen sizes. | `'100vw'` |
| `image` | Product image to display | `product.featured_image`
| `default_size` | [Shopify image size](https://docs.shopify.com/themes/liquid-documentation/filters/url-filters#size-parameters) to load as default `<img>` src | `'medium'` |
| `attributes` | String of additional HTML attributes for the `<img>` tag | `''` |

FAQ
---

- **Why should I use responsive images?**

  Your site will load faster. With responsive images, the user's web browser chooses to download the most appropriate image size for the device and layout.

- **What's up with that chunk of Javascript?**

  It's a necessary hack. Shopify unfortunately doesn't tell us the width of an image, only the length of its *longest side*. But `srcset` *must* know an image's width to work accurately. So as a workaround, that bit of Javascript analyzes the image as soon as it loads, determine its actual width, and updates the srcset attribute.

- **Will this work in all browsers?**

  Yes. However, [native `srcset` support](http://caniuse.com/#feat=srcset) is relatively new, so if you need to support older browsers, then also include the [Picturefill](http://scottjehl.github.io/picturefill/) library.

Reponsive image resources
---

- http://alistapart.com/article/responsive-images-in-practice
- http://ericportis.com/posts/2014/srcset-sizes/
- http://martinwolf.org/2014/05/07/the-new-srcset-and-sizes-explained/
- http://dev.opera.com/articles/native-responsive-images/
