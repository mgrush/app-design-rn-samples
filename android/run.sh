#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n samples.rn.design.app/host.exp.exponent.MainActivity
