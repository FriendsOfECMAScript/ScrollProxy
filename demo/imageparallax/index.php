<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ScrollProxy ES6 demo</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
    <script type="text/javascript" src="../../dist/foes-scrollproxy.umd.js"></script>

    <link rel="stylesheet" href="imageparallax.css"/>
    <script src="imageparallax.js"></script>
</head>
<body>
<div class="parallax-wrapper">

    <?php
        $images = ['landscape-1.jpg', 'landscape-2.jpg', 'landscape-3.jpg', 'landscape-4.jpg', 'landscape-1.jpg', 'landscape-2.jpg', 'landscape-3.jpg', 'landscape-4.jpg'];
        foreach ($images as $image) {
            ?>

            <article class="image-wrapper">
                <img class="image-parallax" src="img/<?php echo $image; ?>"/>
            </article>

            <?php
        }
    ?>

</div>
</body>
</html>
