<?php

namespace TFD\StatamicBardTextStyles;

use ProseMirrorToHtml\Nodes\Node;

class TextStyle extends Node
{
    protected $nodeType = 'textstyle';
    protected $tagName = 'p';

    public function matching()
    {
        return $this->node->type === 'textstyle';
    }
    
    public function tag()
    {
        $tag = [
            [
                'tag'   => parent::tag(),
                'attrs' => [],
            ],
        ];

        if (isset($this->node->attrs->class)) {
            $tag[0]['attrs']['class'] = $this->node->attrs->class;
        }

        return $tag;
    }
}
