TRUNCATE notes, folders RESTART IDENTITY CASCADE;

INSERT INTO folders (name)
VALUES
    ('Music'),
    ('TV'),
    ('Movies'),
    ('Recipes');

INSERT INTO notes (name, content, folderId)
VALUES
    ('Music Notes', 'This is a list of music notes. Not the notes you play, the notes you read.', 1),
    ('TV Shows', 'These are notes about television shows.', 2),
    ('Movie Notes', 'These are notes about movies.', 3),
    ('Recipe Notes', 'These are notes about recipes to try.', 4);