<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ScrollProxy ES6 demo</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>

    <script src="//code.jquery.com/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/plugins/CSSPlugin.js"></script>
    <script type="text/javascript" src="../node_modules/gsap/src/uncompressed/TweenLite.js"></script>
    <script type="text/javascript" src="../../dist/foes-scrollproxy.umd.js"></script>

    <link rel="stylesheet" href="todo.css"/>
    <script src="todo.js"></script>
</head>
<body>
<div class="todo-list">
    <?php
    function getSentenceAndTitle($sentences, $index)
    {
        $sentence = $sentences[$index % count($sentences)];
        preg_match("/(?:\w+(?:\W+|$)){0,3}/", $sentence, $matches);
        $title = $matches[0];

        return [
            'title'    => $title,
            'sentence' => $sentence,
        ];
    }

    $abc = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
    $chars = explode(' ', $abc);
    $lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo faucibus tempus. Donec semper massa risus. Sed massa tellus, scelerisque et ligula non, elementum sollicitudin dui. 
            Donec a scelerisque urna, et viverra tortor. Curabitur euismod quis urna vel dignissim. Etiam rutrum elit vitae nibh malesuada finibus. In ut nisl metus. 
            Donec at maximus eros. Cras vel augue varius, volutpat odio vel, varius odio. Nulla nec bibendum est, vel vestibulum lorem. Nam tristique nibh elit, nec dictum ligula ultricies eget. 
            Maecenas accumsan viverra semper. Ut dictum massa ut justo laoreet, sed pharetra risus convallis. Aliquam at nisl at enim dictum tempus a vitae nulla. Etiam pharetra porta sapien quis dignissim. 
            Morbi cursus molestie urna, ut tincidunt nunc gravida in. Nam vestibulum ipsum pellentesque, accumsan urna at, tincidunt libero. Aliquam rhoncus velit pretium mauris mollis egestas. 
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc eget dictum dolor, sed convallis velit. Mauris vitae risus tempor, egestas ipsum in, maximus quam. 
            Etiam tincidunt aliquet urna nec finibus. Maecenas quis leo eget purus sodales auctor bibendum sed libero. Cras in augue at mauris fermentum ultricies vitae a nisl. 
            Curabitur nulla tortor, posuere in elit et, molestie egestas mi. Aliquam a commodo arcu. Duis est lorem, ultricies nec justo vitae, blandit elementum risus. 
            Pellentesque lorem neque, eleifend non maximus in, finibus quis quam. Aenean sollicitudin nunc mauris, sed bibendum arcu venenatis vel. Sed eget eros commodo, congue nisl et, sollicitudin ligula. 
            Etiam quis consectetur libero. Nulla lobortis eros id nunc placerat finibus ac eget nibh. Pellentesque a faucibus odio. Suspendisse tempor tempor nisi vel fermentum. 
            Nam sollicitudin nulla ut nisi ullamcorper pharetra. Nullam nisl ante, commodo vel luctus quis, suscipit sit amet erat. Nam turpis leo, aliquet sed imperdiet at, porttitor sit amet augue. 
            Nulla sollicitudin elit sed felis volutpat, a consectetur sem ultrices. Aenean aliquam mauris non lorem condimentum, et pharetra purus semper. Nunc risus diam, ultricies vel convallis non, dapibus et risus. 
            Sed eget mattis sem, vitae gravida nunc. Donec malesuada velit maximus pellentesque aliquam. Nam viverra volutpat enim, vel accumsan purus accumsan aliquet. 
            Phasellus dictum elit ut mauris interdum, ut varius sapien tristique. Praesent ultricies purus varius nulla tincidunt convallis. Pellentesque sed est feugiat, porttitor purus id, faucibus erat. 
            Donec volutpat, felis nec eleifend porttitor, est tortor pharetra nulla, et molestie quam lacus et est. Cras luctus ligula quam, id sollicitudin urna ullamcorper nec. 
            Ut urna turpis, ultricies et finibus sed, finibus sit amet nibh. Nullam hendrerit placerat magna, id porttitor purus imperdiet bibendum. Donec ornare metus non ante tristique scelerisque. 
            Integer ac finibus augue. Donec egestas magna eu urna viverra, fringilla rutrum enim aliquet. Quisque quis hendrerit velit. Aliquam eu arcu accumsan ex tempus fringilla at ac ligula.';
    $sentences = explode('. ', $lorem);

    foreach ($chars as $index => $char) {
        ?>
        <article class="sticky-todo">
            <div class="sticky-header__wrapper">
                <div class="sticky-header"><?php echo $char; ?></div>
            </div>

            <?php
            for ($i = $index; $i < $index + rand(2, 4); ++$i) {
                $todo = getSentenceAndTitle($sentences, $i);
                ?>
                <div class="todo">
                    <h3 class="todo__title"><?php echo $todo['title']; ?></h3>
                    <p class="todo__description"><?php echo $todo['sentence']; ?></p>
                </div>
                <?php
            }
            ?>
        </article>

        <?php
    }
    ?>
</div>
</body>
</html>
