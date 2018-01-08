<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ScrollProxy ES6 demo</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

    <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
    <script type="text/javascript" src="../shared/dist/foes-scrollproxy.umd.js"></script>

    <link rel="stylesheet" href="parallax.css"/>
    <script src="parallax.js"></script>
</head>
<body>
<div class="parallax-wrapper">

    <?php
        $texts = ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed commodo faucibus tempus', 'Donec semper massa risus'];
        $images = ['landscape-1.jpg', 'landscape-2.jpg', 'landscape-3.jpg', 'landscape-4.jpg', 'landscape-1.jpg', 'landscape-2.jpg', 'landscape-3.jpg', 'landscape-4.jpg'];
        $i = 0;
        while ($i < 8) {
            ?>

            <article class="image-wrapper">
                <h2 class="image-title"><?php echo $texts[$i % 4]; ?></h2>
                <img class="image-parallax" src="img/<?php echo $images[$i % 4]; ?>"/>
            </article>

            <?php
            $i++;
        }
    ?>

</div>
</body>
</html>
