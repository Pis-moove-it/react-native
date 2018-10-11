FROM arian/android-react-native

# Install Ruby
RUN apt-get install -y ruby
RUN gem install bundler
RUN echo y | apt-get install libmysqlclient-dev ruby-dev
RUN echo y | apt-get install make
RUN echo y | apt-get install g++

# Install react native
RUN npm install -g react-native-cli@2.0.1

