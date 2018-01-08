<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ScrollProxy ES6 demo</title>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
    <script type="text/javascript" src="../shared/dist/foes-scrollproxy.umd.js"></script>

    <link rel="stylesheet" href="reset.css"/>
    <link rel="stylesheet" href="advancedsticky.css"/>
    <script src="advancedsticky.js"></script>
</head>
<body>
<main class="demo">
    <?php
    $images = ['landscape-1.jpg', 'landscape-2.jpg', 'landscape-3.jpg', 'landscape-4.jpg'];
    $lorem = ['<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fermentum, metus non ultrices pulvinar, erat turpis efficitur nunc, eu vulputate quam lorem vel eros. Suspendisse suscipit sit amet lacus vitae vulputate. Pellentesque mi elit, imperdiet ut eleifend ac, elementum vel ipsum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis commodo augue eu lacus fermentum, laoreet aliquam magna euismod. Praesent egestas fermentum iaculis. Donec blandit magna nisl, a consequat lectus semper ac. Nunc placerat ante at turpis posuere, eget mattis justo rutrum. Aenean ut dolor magna. Sed velit mauris, ultrices sit amet mattis sit amet, consequat ac arcu. Aliquam non sapien eleifend, elementum neque sed, euismod eros. Cras iaculis vehicula dui at sodales. Mauris iaculis dui nunc, at tempor turpis facilisis non. Nam sapien arcu, vulputate et nibh in, ultrices luctus ante. Duis sit amet purus vel massa pharetra dignissim. Nullam ut rhoncus risus.</p>',
        '<p>Aliquam tincidunt mattis gravida. Vivamus dolor nisi, accumsan at dignissim vitae, molestie nec turpis. Sed in lacus vitae metus eleifend cursus et id neque. Mauris viverra tellus pharetra nisi egestas euismod. Morbi mollis suscipit augue eu pretium. Praesent at massa ante. Sed condimentum mi in mauris aliquet accumsan. Morbi congue nulla in sem ullamcorper aliquet. Pellentesque sagittis orci sed dignissim posuere. Sed dictum eu erat eget pharetra.</p>',
        '<p>Suspendisse scelerisque, est eu porttitor tincidunt, tellus nibh tincidunt ex, eget cursus enim ligula eu erat. Nullam elementum erat ut dui consectetur, in varius tellus porta. Praesent fringilla orci ac nisi auctor finibus. Sed sollicitudin elit odio, vitae consequat velit ultricies et. Praesent tincidunt faucibus risus sit amet accumsan. Cras id fermentum velit, nec varius enim. Proin sit amet lorem in augue euismod lacinia.</p>',
        '<p>Cras ut convallis odio. Pellentesque venenatis eleifend libero, id auctor enim eleifend at. Duis lorem justo, pretium ac ipsum a, scelerisque convallis arcu. Fusce dapibus rhoncus urna. Suspendisse porttitor, metus et placerat posuere, ligula justo mattis nunc, id fermentum dolor nisi vitae ipsum. Nam quis iaculis urna, at facilisis justo. Integer volutpat ante eu sapien facilisis, eget congue dui molestie.</p>',
        '<p>Proin ut laoreet dolor. Etiam ac ullamcorper lectus. Nunc eleifend lobortis tempus. In pretium purus orci, egestas sodales neque pharetra sit amet. Proin ac tristique arcu, at sodales nulla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras ut risus in massa finibus tincidunt et at lectus. Nam auctor lobortis est, fringilla egestas ipsum rutrum non. Nulla quis bibendum diam. Aenean facilisis interdum odio, et imperdiet arcu malesuada et.</p>'];
    $titles = explode('. ', $lorem[0]);

    for ($i = 0; $i < 10; $i++) {
        shuffle($images);
        shuffle($lorem);
        shuffle($titles);
        $sectionImages = array_slice($images, 0, rand(1, 16));
        $sectionParagraphs = array_slice($lorem, 0, rand(1, 4));
        ?>
        <article>
            <section class="section">
                <div class="col col--5 section__gallery-wrapper">
                    <aside class="section__gallery">
                        <?php foreach ($sectionImages as $image): ?>
                            <figure>
                                <img class="gallery__image" src="img/<?php echo $image; ?>"/>
                            </figure>
                        <?php endforeach; ?>
<!--                        --><?php //foreach ($sectionParagraphs2 as $paragraph) {
//                            echo $paragraph;
//                        } ?>
                    </aside>
                </div>
                <div class="col col--7 section__content-wrapper">
                    <content class="section__content">
                        <h2 class="section__title"><?php echo strip_tags($titles[0]); ?></h2>
                        <?php foreach ($sectionParagraphs as $paragraph) {
                            echo $paragraph;
                        } ?>
                    </content>
                </div>
            </section>
        </article>
        <?php
    }
    ?>
</main>

</body>
</html>
