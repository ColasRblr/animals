<?php

$cardToDelete = $_POST['cardToDelete'];

$xml = simplexml_load_file('../animals.xml');

// echo '<pre>';
// var_dump($xml);
// echo '</pre>';
// die;

foreach ($xml->animalsInfo as $animalsInfo) {

    $name = $animalsInfo->name;

    // echo $name;

    if ($name == $cardToDelete) {
        $dom = dom_import_simplexml($animalsInfo);
        $dom->parentNode->removeChild($dom);
    }
}
$xml->asXML();
if ($xml->asXML("../animals.xml")) {
    header('Location: ../index.html');
}
