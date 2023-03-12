import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, SafeAreaView, Modal, Switch } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

export default function App() {

  const [auton, setAuton] = useState(false);
  const [gridNum, setGridNum] = useState(0);
  const [teamNumVisible, setTeamNumVisible] = useState(false);
  const [teamNum, setTeamNum] = useState();
  const [comments, setComments] = useState("");
  const [penalties, setPenalties] = useState(0);
  const [penComments, setPenComments] = useState("");
  const [malfunctionTime, setMalfunctionTime] = useState(0);
  const [defTime, setDefTime] = useState(0);
  const [drivetrainVisible, setDrivetrainVisible] = useState(false);
  const [drivetrain, setDrivetrain] = useState(' ');
  const [autonDockVisible, setAutonDockVisible] = useState(false);
  const [autonDock, setAutonDock] = useState(' ');
  const [endgameDockVisible, setEndgameDockVisible] = useState(false);
  const [endgameDock, setEndgameDock] = useState(' ');
  const [intakeVisible, setIntakeVisible] = useState(false);
  const [intake, setIntake] = useState(' ');
  const [penVisible, setPenVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [teleopPoints, setTeleopPoints] = useState([]);
  const [autonPoints, setAutonPoints] = useState([]);
  const [fumbles, setFumbles] = useState([]);
  const [rankingPoints, setRankingPoints] = useState(0);
  const [qrVisible, setQrVisible] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const toggleSwitch = () => {
    setAuton(!auton);
  }
  
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
  
  const addRankingPoints=(value) => {
    setRankingPoints(rankingPoints + value);
  }
  const subRankingPoints=(value) => {
    setRankingPoints(rankingPoints - value);
  }
  
  const calculateScore = () => {

    var high = 0;
    var mid = 0;
    var low = 0;
    var chargeStation = 0;
    var fumbleCount = fumbles.length;
    var totalCount = fumbleCount + teleopPoints.length + autonPoints.length;
    var scoringEfficiency = 1 - fumbleCount/totalCount;
    var score = 0;

      // calculating auton score:
      for (var i = 0; i < 9; i++){
        autonPoints.includes(i) ? high++ : null;
      }
      for (var j = 9; j < 18; j++){
        autonPoints.includes(j)  ? mid++: null;
      }
      for (var k = 18; k < 27; k++){
        autonPoints.includes(k) ? low++: null;
      }
      autonDock == "Docked, Engaged"? chargeStation = 5 : autonDock == "Docked" ? chargeStation = 1: null;
      var autonScore = 3*high + 2*mid + low + chargeStation;

      // teleop score:
      high = 0;
      mid = 0;
      low = 0;
      for (var i = 0; i < 9; i++){
        teleopPoints.includes(i) ? high++ : i=i;
      }
      for (var j = 9; j < 18; j++){
        teleopPoints.includes(j)  ? mid++: j=j;
      }
      for (var k = 18; k < 27; k++){
        teleopPoints.includes(k) ? low++: k=k;
      }

      var teleopScore = 3*high + 2*mid + low + defTime/5 - 2*(malfunctionTime/5) + penalties;

      // endgame score:
      var endgameScore = 0;
      endgameDock == "Docked, Engaged" ? endgameScore = 18 : endgameDock== "Docked" ? endgameScore = 3 : null;

      // final score:
      score = Math.round(autonScore + 2*teleopScore + 3*endgameScore + 6*scoringEfficiency - 3*fumbleCount);
      
      setFinalScore(score);
  }

  const handleSubmitPress = () => {
    calculateScore();
    setQrVisible(true);
  }
  const handleNewPress = () => {
    setQrVisible(false);
    setTeamNum();
    setComments("");
    setPenalties("");
    setMalfunctionTime(0);
    setDefTime(0);
    setDrivetrain("");
    setAutonDock("");
    setEndgameDock("");
    setIntake("");
    setTeleopPoints([]);
    setFumbles([]);
    setAutonPoints([]);
    setPenComments("");
    setRankingPoints(0);
    setFinalScore(0);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: 100, flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
        {/* Team number text input box */}
        <Text style={{fontWeight: 'bold', fontSize: 15, marginHorizontal: 10,}}> Team number: </Text>
        <Modal
          animationType='slide'
          transparent={true}
          visible={teamNumVisible}
          onRequestClose = {() => setTeamNumVisible(false)}
        >
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'lightgray',
              flex: 1,
              marginBottom: 300,
              marginTop: 10,
              marginHorizontal: 20,
              borderRadius: 15,
              justifyContent: 'center',
            }}
          >
            <TextInput 
              placeholder="Insert team number..."
              style={{
                borderWidth: 1,
                borderRadius: 8,
                padding: 20,
                flex: 1,
                alignSelf: 'stretch',
                margin: 5,
                backgroundColor: 'white',

              }}
              keyboardType={'number-pad'}
              onChangeText={(value) => setTeamNum(value)}
              value={teamNum}
            />
            <TouchableOpacity
              style={{
                  backgroundColor: 'darkred',
                  height: 50,
                  width: 200,
                  borderRadius: 8,
                  marginBottom: 1,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              onPress={() => setTeamNumVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              height: 40,
              padding: 2,
              justifyContent: 'center',
              width: 100
            }}
            onPress={() => setTeamNumVisible(true)}
          >
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', padding: 5,}}>{teamNum}</Text>
          </TouchableOpacity>
      </View>

      {/* Auton/Teleop toggle */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <Text style ={{fontWeight: 'bold', fontSize: 15, flex: 1, padding: 10, justifyContent: 'center'}}>Teleop/Auton: </Text>
        <Switch
          trackColor={{false: 'lightgray', true: 'dimgray'}}
          thumbColor={auton ? 'darkred' : 'gray'}
          ios_backgroundColor={'white'}
          value = {auton}
          onValueChange={toggleSwitch}
          style={{flex: 1, padding: 2}}
        />
      </View>
      
      <View style={{height: 20, flexDirection: 'row', alighnItems: 'center', paddingTop: 1, justifyContent: 'center', marginBottom: 20}}>
        {/* Grid number input box */}
        <Text style = {{fontWeight: 'bold', fontSize: 15}}> Grid number: {gridNum + 1 } </Text>
      </View>

      {/* setting grid number buttons */}

      <View 
        style={{
          alignSelf:'stretch',
          borderColor: 'black',
          height: 30,
        }}
        >
          {/* grid 1(0) button */}
          <View
            style={{
              flexDirection: 'row',
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.gridChange}
              onPress={() => setGridNum(0)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold', 
                }}
              >
              Grid 1
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridChange}
              onPress={() => setGridNum(1)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Grid 2
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridChange}
              onPress={() => setGridNum(2)}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
              >
                Grid 3
              </Text>
            </TouchableOpacity>

          </View>
      </View>

      <View
        style={{
          alignSelf: 'stretch',
          borderColor: 'black',
          padding: 10,
          height: 350,
          alignItems: 'center',
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 0])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 0])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              // fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles, gridNum * 3 +  0])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 1])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 1])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles, gridNum * 3 +  1])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 2])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 2])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles,gridNum * 3 +  2])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 9])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 9])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles, gridNum * 3 +  9])}
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
            onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 10])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 10])
                }
              }}
          >
          </TouchableOpacity>
          <TouchableOpacity
            //fumble
            style={styles.fumblePoint}
            onPress={() => setFumbles([... fumbles,gridNum * 3 +  10])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 11])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 11])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
              //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles, gridNum * 3 + 11])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 18])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 18])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
            //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles,gridNum * 3 +  18])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 19])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 19])
                }
              }}
            >
            </TouchableOpacity>
            <TouchableOpacity
            //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([... fumbles,gridNum * 3 +  19])}
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
              onPress={() => {
                if (auton == true) {
                  setAutonPoints([...autonPoints, gridNum*3 + 20])
                } else {
                  setTeleopPoints([...teleopPoints, gridNum*3 + 20])
                }
              }}
              onPressIn={console.log(teleopPoints)}
              onPressOut={console.log(autonPoints)}
            >
            </TouchableOpacity>
            <TouchableOpacity
              //fumble
              style={styles.fumblePoint}
              onPress={() => setFumbles([...fumbles,gridNum * 3 +  20])}
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
          {/* Intake dropdown */}
          <Text style={{flex: 1, padding: 10, color: 'black', fontSize: 15, fontWeight: 'bold'}}>Intake: </Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={intakeVisible}
            onRequestClose = {() => setIntakeVisible(false)}
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
              <TextInput
                placeholder="Describe intake..."
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 20,
                  flex: 1,
                  alignSelf: 'stretch',
                  margin: 20,
                  backgroundColor: 'white',
                }}
                multiline={true}
                numberOfLines={5}
                onChangeText={(value) => setIntake(value)}
                value = {intake}
              />
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
                onPress={() => setIntakeVisible(false)}
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
              flex: 4,
            }}
            onPress={() => setIntakeVisible(true)}
          >
            <Text style={{color: 'white', fontSize: 15, padding: 10, fontWeight: 'bold'}}>{intake}</Text>
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

        <View style ={{ height: 50, flexDirection: 'row', marginBottom: 10, }}>
          {/* Endgame docking dropdown */}
          <Text style={{flex: 3, padding: 10, color: 'black', fontSize: 15, fontWeight: 'bold'}}>Docked in Endgame: </Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={endgameDockVisible}
            onRequestClose = {() => setEndgameDockVisible(false)}
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
                onPress={() => setEndgameDock('Docked, Engaged')}
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
                onPress={() => setEndgameDock('Docked')}
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
                onPress={() => setEndgameDock('Failed')}
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
                onPress={() => setEndgameDock('No Attempt')}
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
                onPress={() => setEndgameDockVisible(false)}
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
              flex: 4,
            }}
            onPress={() => setEndgameDockVisible(true)}
          >
            <Text style={{color: 'white', fontSize: 15, padding: 10, fontWeight: 'bold'}}>{endgameDock}</Text>
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

        <View style={{height: 40, paddingBottom: 10, flexDirection: 'row'}}>
        {/* Penalty comments input box */}
          <Text style={{fontSize: 15, fontWeight: 'bold', flex: 1, marginTop: 7,}}> Penalties: </Text>
          <Modal
            animationType='slide'
            transparent={true}
            visible={penVisible}
            onRequestClose = {() => setPenVisible(false)}
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
              <TextInput 
                placeholder="Elaborate on penalties..."
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 20,
                  flex: 1,
                  alignSelf: 'stretch',
                  margin: 20,
                  backgroundColor: 'white',
                }}
                multiline={true}
                numberOfLines={5}
                onChangeText={(value) => setPenComments(value)}
                value = {penComments}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: 'darkred',
                  height: 50,
                  width: 200,
                  borderRadius: 8,
                  marginBottom: 10,
                  padding: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setPenVisible(false)}
              >
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 15, padding: 5,}}>Close Menu</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              height: 40,
              padding: 2,
              flex: 3,
              justifyContent: 'center',
            }}
            onPress={() => setPenVisible(true)}
          >
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', padding: 5,}}>Elaborate on penalties...</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center'}}>
          {/* Defence time counter */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
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
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
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



        <View style={{ height: 100, flexDirection: 'row', alignItems: 'center'}}>
          {/* Garbage time counter */}
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
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
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
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
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
            onPress={() => subRankingPoints(1)}
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
            Ranking Points: {rankingPoints} points  
          </Text>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
            }}
            onPress={() => addRankingPoints(1)}
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

        <View style={{flexDirection: 'row', height: 50, justifyContent: 'center'}}>
        {/* Comments text input box */}
        <Text style={{fontSize: 15, fontWeight: 'bold', flex: 1,}}>Additional Comments: </Text>
        <Modal
          animationType='slide'
          transparent={true}
          visible={commentsVisible}
          onRequestClose = {() => setPenVisible(false)}
        >
        
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'lightgray',
              flex: 1,
              marginVertical: 100,
              marginHorizontal: 20,
              borderRadius: 15,
              justifyContent: 'center',
            }}
          >
            <TextInput
              placeholder="Insert additional comments here..."
              style={{
                borderWidth: 1,
                borderRadius: 8,
                padding: 20,
                flex: 1,
                alignSelf: 'stretch',
                margin: 20,
                backgroundColor: 'white',
              }}
              multiline={true}
              numberOfLines={5}
              onChangeText={(value) => setComments(value)}
              value = {comments}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'darkred',
                height: 50,
                width: 200,
                borderRadius: 8,
                marginBottom: 10,
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setCommentsVisible(false)}
            >
              <Text style={{fontWeight: 'bold', fontSize: 15, color: 'white', padding: 5,}}>Close Menu</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            backgroundColor: 'darkred',
            height: 40,
            padding: 2,
            flex: 3,
            justifyContent: 'center',
          }}
          onPress={() => setCommentsVisible(true)}
        >
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white', padding: 5,}}> Add comments... </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          padding: 10,
          alignSelf: 'stretch',
          backgroundColor: 'darkred',
          alignItems: 'center',
        }}
        onPress={handleSubmitPress}
      >
        {/* generate QR code button*/}
        <Text
          style={styles.buttonText}
        >Submit!</Text>
      </TouchableOpacity>
      <Modal visible = {qrVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <QRCode
            size={
              300
            }
            value = {JSON.stringify({
              "team": teamNum,
              "charge_station_auton": autonDock,
              "charge_station_endgame": endgameDock,
              "game_pieces_tele": teleopPoints.join(","),
              "game_pieces_auton": autonPoints.join(","),
              "game_pieces_fumbled": fumbles.join(","),
              "drive_train": drivetrain,
              "penalties": penComments,
              "penalty_points": penalties,
              "comments": comments,
              "intake": intake,
              "defence_time": defTime,
              "malfunction_time": malfunctionTime,
              "ranking_points": rankingPoints,
              "score": finalScore
            })}
          />
          <Text style = {{fontWeight: 'bold', fontSize: 15, margin: 10,}}>Take a screenshot!</Text>
          <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              paddingVertical: 10,
              paddingHorizontal: 40,
              justifyContent: 'center',
              height: 80,
              marginTop: 40,
            }}
            onPress={handleNewPress}
          >
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold',}}>New Game</Text>
          </TouchableOpacity>
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
  gridChange: {
    backgroundColor: 'darkred',
    height: 40,
    width: 70,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  }
});
