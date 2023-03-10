import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal, Touchable, Button } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';


export default function App() {

  const [teamNum, setTeamNum] = useState();
  const [comments, setComments] = useState("");
  const [penalties, setPenalties] = useState(0);
  const [penComments, setPenComments] = useState("");
  const [malfunctionTime, setMalfunctionTime] = useState(0);
  const [defTime, setDefTime] = useState(0);
  const [drivetrainVisible, setDrivetrainVisible] = useState(false);
  const [drivetrain, setDrivetrain] = useState('Set Drivetrain');
  const [autonDockVisible, setAutonDockVisible] = useState(false);
  const [autonDock, setAutonDock] = useState('Docked?');
  const [teleopPoints, setTeleopPoints] = useState([]);
  const [fumbles, setFumbles] = useState([]);
  const [qrVisible, setQrVisible] = useState(false);

  const losePoints = (value) => {
    setPenalties(penalties - value);
  }

  const addMalfunctionTime = (value) => {
    setMalfunctionTime(malfunctionTime + value);
  }
  const subtMalfunctionTime = (value) => {
    setMalfunctionTime(malfunctionTime - value);
  }

  const addDefTime = (value) => {
    setDefTime(defTime + value);
  }
  const subtDefTime = (value) => {
    setDefTime(defTime - value);
  }
  const handleSubmitPress = () => {
    setQrVisible(true);
    console.log("show qr");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 100, flexDirection: 'row', alignItems: 'center'}}>
        {/* Team number text input box */}
        <Text> Team number: </Text>
        <TextInput 
          placeholder="Insert team number..."
          style={{height: 40, borderColor: 'black', borderWidth: 1, padding: 5, }}
          keyboardType={'number-pad'}
          onChangeText={(value) => setTeamNum(value)}
          value={teamNum}
        />
      </View>

        <View
          style={{
            alignSelf: 'stretch',
            borderColor: 'black',
            padding: 10,
            height: 350,
          }}
        >
          {/* Grid 1 */}
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              height:115,
            }}
          >
            {/* row one */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,

              }}
            >
              {/* high-left, grid 1 */}
              <TouchableOpacity
                // point
                style={styles.conePoint}
                onPress={() => setTeleopPoints([... teleopPoints, 0])}
              >
              </TouchableOpacity>
              <TouchableOpacity
                // fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 0])}
              >
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
              {/* high-mid, grid 1 */}
              <TouchableOpacity
                // point
                style={styles.cubePoint}
                onPress={() => setTeleopPoints([... teleopPoints, 1])}
              >
              </TouchableOpacity>
              <TouchableOpacity
                //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 1])}
                >
                </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}>
              {/* high-right, grid 1 */}
              <TouchableOpacity
                //point
                style={styles.conePoint}
                onPress={() => setTeleopPoints([... teleopPoints, 2])}
              >
              </TouchableOpacity>
              <TouchableOpacity
                //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 2])}
              >
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 5,
            }}
          >
          {/* row two, grid 1 */}
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  padding: 2,
                }}
              >
              {/* mid-left, grid 1 */}
                <TouchableOpacity
                  //point
                  style={styles.conePoint}
                  onPress={() => setTeleopPoints([... teleopPoints, 9])}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  //fumble
                  style={styles.fumblePoint}
                  onPress={() => setFumbles([... fumbles, 9])}
                >
                </TouchableOpacity>
              </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
            {/* mid-mid, grid 1 */}
              <TouchableOpacity
                //point
                style={styles.cubePoint}
                onPress={() => setTeleopPoints([... teleopPoints, 10])}
              >
              </TouchableOpacity>
              <TouchableOpacity
                //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 10])}
              >
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
            {/* mid-right, grid 1 */}
              <TouchableOpacity
                //point
                style={styles.conePoint}
                onPress={() => setTeleopPoints([... teleopPoints, 11])}
              >
              </TouchableOpacity>
              <TouchableOpacity
                //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 11])}
              >
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 5,
            }}
          >
            {/* row three */}
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
            {/* low-left, grid 1 */}
              <TouchableOpacity
              //point
                style={styles.lowPoint}
                onPress={() => setTeleopPoints([... teleopPoints, 18])}
              >
              </TouchableOpacity>
              <TouchableOpacity
              //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 18])}
              >
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
              {/* low-mid, grid 1 */}
              <TouchableOpacity
                //point
                style={styles.lowPoint}
                onPress={() => setTeleopPoints([... teleopPoints, 19])}
              >
              </TouchableOpacity>
              <TouchableOpacity
              //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([... fumbles, 19])}
              >
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 2,
              }}
            >
            {/* low-right */}
              <TouchableOpacity
                //point
                style={styles.lowPoint}
                onPress={() => setTeleopPoints([... teleopPoints, 20])}
                onPressIn={console.log(teleopPoints)}
              >
              </TouchableOpacity>
              <TouchableOpacity
                //fumble
                style={styles.fumblePoint}
                onPress={() => setFumbles([...fumbles, 20])}
                onPressOut={console.log(fumbles)}
              >
              </TouchableOpacity>
            </View>
          </View>
        </View>

      <ScrollView contentContainerStyle={styles.itemsContainer}> 

        <View style ={{ height: 50, flexDirection: 'row', marginVertical: 10, }}>
          {/* Drivetrain dropdown */}
          <Text style={{flex: 1, padding: 10, color: 'black', fontSize: 15, fontWeight: 'bold'}}>Drivetrain: </Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={drivetrainVisible}
            onRequestClose = {() => setDrivetrainVisible(false)}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'lightgray',
                flex: 1,
                marginVertical: 200,
                marginHorizontal: 20,
                borderRadius: 15,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setDrivetrain('Tank')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Tank Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setDrivetrain('West Coast')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>West Coast Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setDrivetrain('Swerve')}
              >
                <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Swerve Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setDrivetrain('Mecanum')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Mecanum Drive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'dimgray',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setDrivetrainVisible(false)}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Close Menu</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              height: 50,
              width: 300,
              padding: 2,
              flex: 3,
            }}
            onPress={() => setDrivetrainVisible(true)}
          >
            <Text style={{color: 'white', fontSize: 15, padding: 10, fontWeight: 'bold'}}>{drivetrain}</Text>
          </TouchableOpacity>
        </View>

        <View style ={{ height: 50, flexDirection: 'row', marginBottom: 10, }}>
          {/* Auton docking dropdown */}
          <Text style={{flex: 2, padding: 10, color: 'black', fontSize: 15, fontWeight: 'bold'}}>Docked in Auton: </Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={autonDockVisible}
            onRequestClose = {() => setAutonDockVisible(false)}
          >
            <View
              style={{
                alignItems: 'center',
                backgroundColor: 'lightgray',
                flex: 1,
                marginVertical: 200,
                marginHorizontal: 20,
                borderRadius: 15,
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setAutonDock('Docked, Engaged')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Docked and Engaged</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setAutonDock('Docked')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Docked</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setAutonDock('Failed')}
              >
                <Text style = {{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Failed to Dock</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setAutonDock('No Attempt')}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Did Not Attempt</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'dimgray',
                  borderRadius: 8,
                  alignItems: 'center',
                  height: 60,
                  alignSelf: 'stretch',
                  justifyContent: 'center',
                  margin: 10,
                }}
                onPress={() => setAutonDockVisible(false)}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15,}}>Close Menu</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              height: 50,
              width: 300,
              padding: 2,
              flex: 3,
            }}
            onPress={() => setAutonDockVisible(true)}
          >
            <Text style={{color: 'white', fontSize: 15, padding: 10, fontWeight: 'bold'}}>{autonDock}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center'}}>
        {/* Penalty point counter */}
          <TouchableOpacity 
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              margin: 10,
              justifyContent: 'center',
              height: 50
            }}
            onPress={() => losePoints(5)}
          >
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              -5
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 2,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 50,
            }}
            onPress={() => losePoints(12)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                -12
              </Text>
          </TouchableOpacity>
          <Text
            style={{
              flex: 5,
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              padding: 30
             }}
            >
             Penalties:   {penalties}
           </Text>
        </View>

        <View style={{height: 150, paddingBottom: 10}}>
        {/* Penalty comments input box */}
          <Text> Penalties: </Text>
          <TextInput 
            placeholder="Elaborate on penalties..."
            style={{
              height: 60,
              width: 350,
              borderColor: 'black',
              borderWidth: 1,
              padding: 20,
              flex: 1,
            }}
            multiline={true}
            numberOfLines={5}
            onChangeText={(value) => setPenComments(value)}
            value = {penComments}
          />
        </View>

        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center'}}>
          {/* Garbage time counter */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 50,
            }}
            onPress={() => subtMalfunctionTime(1)}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              -
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              flex: 20,
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              padding: 30
            }}
          >
            Malfunction time: {malfunctionTime} secs  
          </Text>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 50,
            }}
            onPress={() => addMalfunctionTime(1)}
          >
            <Text
              style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
              }}
            >
             + 
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center'}}>
          {/* Defence time counter */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 50,
            }}
            onPress={() => subtDefTime(1)}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
              -
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              flex: 20,
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              padding: 30
            }}
          >
            Defence time:   {defTime} secs  
          </Text>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 50,
            }}
            onPress={() => addDefTime(1)}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
              }}
            >
            +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{height: 300}}>
        {/* Comments text input box */}
          <Text> Additional Comments: </Text>
          <TextInput
            placeholder="Insert additional comments here..."
            style={{
                height: 40, 
                width: 350,
                borderColor: 'black', 
                borderWidth: 1, 
                padding: 20, 
                flex: 1
                }}
            multiline={true}
            numberOfLines={5}
            onChangeText={(value) => setComments(value)}
            value = {comments}
            />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          alignSelf: 'stretch',
          backgroundColor: 'darkred',
          alignItems: 'center',
        }}
        onPress= {handleSubmitPress}
      >
        {/* generate QR code button -- triggers screen navigation */}
        <Text
          style={styles.buttonText}
        >Submit!</Text>
      </TouchableOpacity>
      <Modal visible = {qrVisible}>
        <View style = {styles.modal}>
          <QRCode value =  {JSON.stringify({"team":teamNum,
          "charge_station_auton":autonDock, 
          "game_pieces_tele":teleopPoints.join(","),
          "game_pieces_fumbled": fumbles.join(","),
          "drive_train" : drivetrain,
          "penalties": penComments,
          "penalty_points": penalties,
          "comments": comments
          })}/>
          <Button title='Close' onPress = {() => setQrVisible(false)} />
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemsContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'darkred',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  penaltyText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  conePoint: {
    flex: 1,
    padding: 3,
    backgroundColor: 'orange',
    height: 50,
    width: 100,
    borderColor: 'black',
  },
  cubePoint: {
    flex: 1,
    padding: 3,
    backgroundColor: 'blue',
    height: 50,
    width: 100,
    borderColor: 'black',
  },
  fumblePoint: {
    flex: 1,
    padding: 3,
    backgroundColor: 'gray',
    height: 50,
    width: 100,
    borderColor: 'black',
  },
  lowPoint: {
    flex: 1,
    padding: 3,
    backgroundColor: 'dimgray',
    height: 50,
    width: 100,
    borderColor: 'black',
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});