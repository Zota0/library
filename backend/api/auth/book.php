<?php

    class Book {
        public function __construct(
            public string $title,
            public string $author,
            public string $genre,
            public string $isbn,
            public string $publisher,
            public int $pages
        ) {}

        public function toArray(): array {
            return get_object_vars($this);
        }

        public function __invoke(): array {
            return $this->toArray();
        }
    }