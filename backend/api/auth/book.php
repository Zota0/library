<?php

    class Book {
        public function __construct(
            public string|null $title,
            public string|null $author,
            public string|null $genre,
            public string|null $isbn,
            public string|null $publisher,
            public int|null $pages
        ) {}

        public function toArray(): array {
            return get_object_vars($this);
        }

        public function __invoke(): array {
            return $this->toArray();
        }
    }