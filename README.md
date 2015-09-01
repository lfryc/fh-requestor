fh-requestor
============

Allows to proxy requests to the development fhcap hosted under publicly available IP, but without the proper DNS configuration (i.e. serving `testing.feedhenry.me`).

The proxy can be configured with the IP:

    https://<url>/configure?ip=1.2.3.4

Then you can access the server behind the proxy as:

	https://<url>


Deploying to OpenShift
----------------------

For quick deployments, you can use OpenShift nodejs cartridge, just provide this repository as initial source and you can have your proxy hosted in a minute with proper SSL setup.