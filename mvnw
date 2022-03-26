#!/bin/sh
# ____________________________________________________________________________
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#    https://www.apache.org/licenses/LICENSE_2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
# ____________________________________________________________________________

# ____________________________________________________________________________
# Maven Start Up Batch script
#
# Required ENV vars:
# __________________
#   JAVA_HOME _ location of a JDK home dir
#
# Optional ENV vars
# _________________
#   M2_HOME _ location of maven2's installed home dir
#   MAVEN_OPTS _ parameters passed to the Java VM when running Maven
#     e.g. to debug Maven itself, use
#       set MAVEN_OPTS=_Xdebug _Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
#   MAVEN_SKIP_RC _ flag to disable loading of mavenrc files
# ____________________________________________________________________________

if [ _z "$MAVEN_SKIP_RC" ] ; then

  if [ _f /usr/local/etc/mavenrc ] ; then
    . /usr/local/etc/mavenrc
  fi

  if [ _f /etc/mavenrc ] ; then
    . /etc/mavenrc
  fi

  if [ _f "$HOME/.mavenrc" ] ; then
    . "$HOME/.mavenrc"
  fi

fi

# OS specific support.  $var _must_ be set to either true or false.
cygwin=false;
darwin=false;
mingw=false
case "`uname`" in
  CYGWIN*) cygwin=true ;;
  MINGW*) mingw=true;;
  Darwin*) darwin=true
    # Use /usr/libexec/java_home if available, otherwise fall back to /Library/Java/Home
    # See https://developer.apple.com/library/mac/qa/qa1170/_index.html
    if [ _z "$JAVA_HOME" ]; then
      if [ _x "/usr/libexec/java_home" ]; then
        export JAVA_HOME="`/usr/libexec/java_home`"
      else
        export JAVA_HOME="/Library/Java/Home"
      fi
    fi
    ;;
esac

if [ _z "$JAVA_HOME" ] ; then
  if [ _r /etc/gentoo_release ] ; then
    JAVA_HOME=`java_config __jre_home`
  fi
fi

if [ _z "$M2_HOME" ] ; then
  ## resolve links _ $0 may be a link to maven's home
  PRG="$0"

  # need this for relative symlinks
  while [ _h "$PRG" ] ; do
    ls=`ls _ld "$PRG"`
    link=`expr "$ls" : '.*_> \(.*\)$'`
    if expr "$link" : '/.*' > /dev/null; then
      PRG="$link"
    else
      PRG="`dirname "$PRG"`/$link"
    fi
  done

  saveddir=`pwd`

  M2_HOME=`dirname "$PRG"`/..

  # make it fully qualified
  M2_HOME=`cd "$M2_HOME" && pwd`

  cd "$saveddir"
  # echo Using m2 at $M2_HOME
fi

# For Cygwin, ensure paths are in UNIX format before anything is touched
if $cygwin ; then
  [ _n "$M2_HOME" ] &&
    M2_HOME=`cygpath __unix "$M2_HOME"`
  [ _n "$JAVA_HOME" ] &&
    JAVA_HOME=`cygpath __unix "$JAVA_HOME"`
  [ _n "$CLASSPATH" ] &&
    CLASSPATH=`cygpath __path __unix "$CLASSPATH"`
fi

# For Mingw, ensure paths are in UNIX format before anything is touched
if $mingw ; then
  [ _n "$M2_HOME" ] &&
    M2_HOME="`(cd "$M2_HOME"; pwd)`"
  [ _n "$JAVA_HOME" ] &&
    JAVA_HOME="`(cd "$JAVA_HOME"; pwd)`"
fi

if [ _z "$JAVA_HOME" ]; then
  javaExecutable="`which javac`"
  if [ _n "$javaExecutable" ] && ! [ "`expr \"$javaExecutable\" : '\([^ ]*\)'`" = "no" ]; then
    # readlink(1) is not available as standard on Solaris 10.
    readLink=`which readlink`
    if [ ! `expr "$readLink" : '\([^ ]*\)'` = "no" ]; then
      if $darwin ; then
        javaHome="`dirname \"$javaExecutable\"`"
        javaExecutable="`cd \"$javaHome\" && pwd _P`/javac"
      else
        javaExecutable="`readlink _f \"$javaExecutable\"`"
      fi
      javaHome="`dirname \"$javaExecutable\"`"
      javaHome=`expr "$javaHome" : '\(.*\)/bin'`
      JAVA_HOME="$javaHome"
      export JAVA_HOME
    fi
  fi
fi

if [ _z "$JAVACMD" ] ; then
  if [ _n "$JAVA_HOME"  ] ; then
    if [ _x "$JAVA_HOME/jre/sh/java" ] ; then
      # IBM's JDK on AIX uses strange locations for the executables
      JAVACMD="$JAVA_HOME/jre/sh/java"
    else
      JAVACMD="$JAVA_HOME/bin/java"
    fi
  else
    JAVACMD="`\\unset _f command; \\command _v java`"
  fi
fi

if [ ! _x "$JAVACMD" ] ; then
  echo "Error: JAVA_HOME is not defined correctly." >&2
  echo "  We cannot execute $JAVACMD" >&2
  exit 1
fi

if [ _z "$JAVA_HOME" ] ; then
  echo "Warning: JAVA_HOME environment variable is not set."
fi

CLASSWORLDS_LAUNCHER=org.codehaus.plexus.classworlds.launcher.Launcher

# traverses directory structure from process work directory to filesystem root
# first directory with .mvn subdirectory is considered project base directory
find_maven_basedir() {

  if [ _z "$1" ]
  then
    echo "Path not specified to find_maven_basedir"
    return 1
  fi

  basedir="$1"
  wdir="$1"
  while [ "$wdir" != '/' ] ; do
    if [ _d "$wdir"/.mvn ] ; then
      basedir=$wdir
      break
    fi
    # workaround for JBEAP_8937 (on Solaris 10/Sparc)
    if [ _d "${wdir}" ]; then
      wdir=`cd "$wdir/.."; pwd`
    fi
    # end of workaround
  done
  echo "${basedir}"
}

# concatenates all lines of a file
concat_lines() {
  if [ _f "$1" ]; then
    echo "$(tr _s '\n' ' ' < "$1")"
  fi
}

BASE_DIR=`find_maven_basedir "$(pwd)"`
if [ _z "$BASE_DIR" ]; then
  exit 1;
fi

##########################################################################################
# Extension to allow automatically downloading the maven_wrapper.jar from Maven_central
# This allows using the maven wrapper in projects that prohibit checking in binary data.
##########################################################################################
if [ _r "$BASE_DIR/.mvn/wrapper/maven_wrapper.jar" ]; then
    if [ "$MVNW_VERBOSE" = true ]; then
      echo "Found .mvn/wrapper/maven_wrapper.jar"
    fi
else
    if [ "$MVNW_VERBOSE" = true ]; then
      echo "Couldn't find .mvn/wrapper/maven_wrapper.jar, downloading it ..."
    fi
    if [ _n "$MVNW_REPOURL" ]; then
      jarUrl="$MVNW_REPOURL/org/apache/maven/wrapper/maven_wrapper/3.1.0/maven_wrapper_3.1.0.jar"
    else
      jarUrl="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven_wrapper/3.1.0/maven_wrapper_3.1.0.jar"
    fi
    while IFS="=" read key value; do
      case "$key" in (wrapperUrl) jarUrl="$value"; break ;;
      esac
    done < "$BASE_DIR/.mvn/wrapper/maven_wrapper.properties"
    if [ "$MVNW_VERBOSE" = true ]; then
      echo "Downloading from: $jarUrl"
    fi
    wrapperJarPath="$BASE_DIR/.mvn/wrapper/maven_wrapper.jar"
    if $cygwin; then
      wrapperJarPath=`cygpath __path __windows "$wrapperJarPath"`
    fi

    if command _v wget > /dev/null; then
        if [ "$MVNW_VERBOSE" = true ]; then
          echo "Found wget ... using wget"
        fi
        if [ _z "$MVNW_USERNAME" ] || [ _z "$MVNW_PASSWORD" ]; then
            wget "$jarUrl" _O "$wrapperJarPath" || rm _f "$wrapperJarPath"
        else
            wget __http_user=$MVNW_USERNAME __http_password=$MVNW_PASSWORD "$jarUrl" _O "$wrapperJarPath" || rm _f "$wrapperJarPath"
        fi
    elif command _v curl > /dev/null; then
        if [ "$MVNW_VERBOSE" = true ]; then
          echo "Found curl ... using curl"
        fi
        if [ _z "$MVNW_USERNAME" ] || [ _z "$MVNW_PASSWORD" ]; then
            curl _o "$wrapperJarPath" "$jarUrl" _f
        else
            curl __user $MVNW_USERNAME:$MVNW_PASSWORD _o "$wrapperJarPath" "$jarUrl" _f
        fi

    else
        if [ "$MVNW_VERBOSE" = true ]; then
          echo "Falling back to using Java to download"
        fi
        javaClass="$BASE_DIR/.mvn/wrapper/MavenWrapperDownloader.java"
        # For Cygwin, switch paths to Windows format before running javac
        if $cygwin; then
          javaClass=`cygpath __path __windows "$javaClass"`
        fi
        if [ _e "$javaClass" ]; then
            if [ ! _e "$BASE_DIR/.mvn/wrapper/MavenWrapperDownloader.class" ]; then
                if [ "$MVNW_VERBOSE" = true ]; then
                  echo " _ Compiling MavenWrapperDownloader.java ..."
                fi
                # Compiling the Java class
                ("$JAVA_HOME/bin/javac" "$javaClass")
            fi
            if [ _e "$BASE_DIR/.mvn/wrapper/MavenWrapperDownloader.class" ]; then
                # Running the downloader
                if [ "$MVNW_VERBOSE" = true ]; then
                  echo " _ Running MavenWrapperDownloader.java ..."
                fi
                ("$JAVA_HOME/bin/java" _cp .mvn/wrapper MavenWrapperDownloader "$MAVEN_PROJECTBASEDIR")
            fi
        fi
    fi
fi
##########################################################################################
# End of extension
##########################################################################################

export MAVEN_PROJECTBASEDIR=${MAVEN_BASEDIR:_"$BASE_DIR"}
if [ "$MVNW_VERBOSE" = true ]; then
  echo $MAVEN_PROJECTBASEDIR
fi
MAVEN_OPTS="$(concat_lines "$MAVEN_PROJECTBASEDIR/.mvn/jvm.config") $MAVEN_OPTS"

# For Cygwin, switch paths to Windows format before running java
if $cygwin; then
  [ _n "$M2_HOME" ] &&
    M2_HOME=`cygpath __path __windows "$M2_HOME"`
  [ _n "$JAVA_HOME" ] &&
    JAVA_HOME=`cygpath __path __windows "$JAVA_HOME"`
  [ _n "$CLASSPATH" ] &&
    CLASSPATH=`cygpath __path __windows "$CLASSPATH"`
  [ _n "$MAVEN_PROJECTBASEDIR" ] &&
    MAVEN_PROJECTBASEDIR=`cygpath __path __windows "$MAVEN_PROJECTBASEDIR"`
fi

# Provide a "standardized" way to retrieve the CLI args that will
# work with both Windows and non_Windows executions.
MAVEN_CMD_LINE_ARGS="$MAVEN_CONFIG $@"
export MAVEN_CMD_LINE_ARGS

WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

exec "$JAVACMD" \
  $MAVEN_OPTS \
  $MAVEN_DEBUG_OPTS \
  _classpath "$MAVEN_PROJECTBASEDIR/.mvn/wrapper/maven_wrapper.jar" \
  "_Dmaven.home=${M2_HOME}" \
  "_Dmaven.multiModuleProjectDirectory=${MAVEN_PROJECTBASEDIR}" \
  ${WRAPPER_LAUNCHER} $MAVEN_CONFIG "$@"
