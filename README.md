# scrobbletree
A music exploration app based on the Last.FM API

# Source Directory Structure Guide
```
│
└ /src/main
   │
   ├ /java/com/vsm22/scrobbletree (main package containing the front controller and main runner)
   │   │
   │   ├ /data (classes for local data representation) 
   │   │   │
   │   │   └ /parsers (utility classes for parsing xml to local data classes)
   │   │
   │   └ /remote_resource_accessors (utility classes to access the remote API)
   │ 
   ├ /resources/public (public entry point)
   │
   └ /js
      ├ /react-components (react components)
      │ 
      └ /index.js (main entry point)
```
