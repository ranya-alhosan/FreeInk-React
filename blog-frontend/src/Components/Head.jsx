import React from 'react';
import { Helmet } from 'react-helmet';

function Head() {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Mobile metas */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
      
      {/* Site metas */}
      <title>FreeInk</title>
      <meta name="keywords" content="" />
      <meta name="description" content="" />
      <meta name="author" content="" /> {/* Fixed typo here */}
      
      {/* Bootstrap CSS */}
      <link rel="stylesheet" type="text/css" href="/assets/css/bootstrap.min.css" />
      
      {/* Style CSS */}
      <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      
      {/* Responsive CSS */}
      <link rel="stylesheet" href="/assets/css/responsive.css" />
      
      {/* Favicon */}
      <link rel="icon" href="/assets/images/fevicon.png" type="image/gif" />
      
      {/* Scrollbar Custom CSS */}
      <link rel="stylesheet" href="/assets/css/jquery.mCustomScrollbar.min.css" />
      
      {/* Font Awesome for older IEs */}
      <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" />
      
      {/* Owl Carousel Stylesheets */}
      <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
      <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css"/>
      
      {/* Fancybox CSS */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen" />
    </Helmet>
  );
}

export default Head;
