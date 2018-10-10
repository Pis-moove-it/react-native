FROM arian/android-react-native

# Install Ruby
RUN apt-get install -y ruby
RUN gem install bundler
RUN echo y | apt-get install libmysqlclient-dev ruby-dev
RUN echo y | apt-get install make
RUN echo y | apt-get install g++

# Install react native
RUN npm install -g react-native-cli@2.0.1


RUN sdkmanager \
"build-tools;25.0.0" \
"build-tools;25.0.1" \
"build-tools;25.0.2" \
"build-tools;25.0.3" \
"build-tools;26.0.1"

RUN sdkmanager "platforms;android-API_LEVEL"