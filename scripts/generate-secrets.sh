#!/bin/sh

fusionChartsLicenseKey=$1

cat >./dist/web/assets/secrets.json <<EOF
    {
      "fusionChartsLicenseKey": "$fusionChartsLicenseKey"
    }
EOF
