# MediaEval Person Discovery 2016 / Evidence management

Fork, update `js/config.js` and enjoy!

## Usage

* Get the webapp Javascript client source code:

  ```
  $ git clone git@github.com:hbredin/PersonDiscovery2016_EvidenceManagement.git
  $ cd PersonDiscovery2016_EvidenceManagement
  $ git submodule init
  $ git submodule update
  ```

* Update the configuration file `js/config.js`.

  Make sure it links to your Camomile REST API [backend](http://github.com/camomile-project/camomile-server).

* Launch a web server (e.g. [http-server](https://www.npmjs.com/package/http-server))

  ```
  $ http-server
  ```

* Visit [http://localhost:8080](http://localhost:8080)

  You will need to allow cookies in your browser for this to work...
