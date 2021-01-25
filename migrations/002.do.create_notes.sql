CREATE TABLE notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    note_name TEXT NOT NULL,
    date_modified TIMESTAMPTZ DEFAULT now() NOT NULL,
    folder_id INTEGER
        REFERENCES folders(id) ON DELETE CASCADE NOT NULL,
    content TEXT
);