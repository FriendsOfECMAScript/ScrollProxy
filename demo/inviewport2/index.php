<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ScrollProxy ES6 demo</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

    <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/easing/EasePack.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
    <script type="text/javascript" src="../shared/dist/foes-scrollproxy.umd.js"></script>

    <link rel="stylesheet" href="inviewport.css"/>
    <script src="inviewport.js"></script>
</head>
<body>
    <div class="demo-controls__wrapper">
        <div class="demo-controls">
            <button class="button" data-squares="500">500</button>
            <button class="button" data-squares="1000">1000</button>
            <button class="button" data-squares="2000">2000</button>
            <button class="button" data-squares="4000">4000</button>
        </div>
    </div>
</body>
</html>
