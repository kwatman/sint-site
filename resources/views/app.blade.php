<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    @if(env('UMAMI_HOST') && env('UMAMI_ID'))
        <script defer src="{{ env('UMAMI_HOST') }}" data-website-id="{{ env('UMAMI_ID') }}"></script>
    @endif
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('resources/js/app.ts')
    @inertiaHead
</head>
<body>
@inertia
</body>
</html>
