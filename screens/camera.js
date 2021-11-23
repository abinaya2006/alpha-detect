import * as React from 'react'
import { View,  Button,Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class PickImage extends React.Component {
    state = {
        image: null
    }

    render() {
        let { image } = this.state

        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button
                    title="Pick an image from gallery"
                    onPress={this._pickImage}
                />
            </View>
        )
    }

    getPermissionsAsync = async () => {
        if (!Platform.OS == "web") {
            const { status } = await Permissions.askAsync(Permissions, CAMERA_ROLL)

            if (status !== "granted") {
                alert("Sorry,we need camera permissions for this app to work.")
            }
        }
    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            })

            if (!result.cancelled) {
                this.setState({
                    image: result.data
                })
            }

            this.uploadImage(result.uri)
        }

        catch (e) {
            console.log(e)
        }
    }

    uploadImage = async (uri) => {
        const data = new FormData
        let filename = uri.split("/")[uri.split("/").length - 1]
        let file_type = `image${uri.split(".")[uri.split(".").length - 1]}`

        const filetoUpload = {
            uri: uri,
            name: filename,
            type: file_type
        }

        data.append("digit", filetoUpload)

        fetch("http://df8b-2401-4900-2301-e875-8441-6116-11d0-5f78.ngrok.io/predict-alphabet", {
            method: "POST",
            body: data,
            headers: {
                "content-type": "multipart/form-data"
            }
        })

            .then((response) => response.json())
            .then((result) => {
                console.log("Success", result)
            })
            .catch((error) => {
                console.log("error: ", error)
            })
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#FFFDA3",
//         borderTopWidth: 9,
//         borderBottomWidth: 9,
//         borderLeftWidth: 9,
//         borderRightWidth: 9,
//         borderColor: "#B2E783"
//     },
//     top_text: {
//         textAlign: "center",
//         fontSize: 20
//     },
//     touchable_opa: {
//         backgroundColor: "#5DB186",
//         height: 0,
//         borderRadius: 20,
//         marginTop: 30,
//         width: 200
//     },
//     button_text: {
//         color: "white",
//         textAlign: 'center',
//         fontSize: 17
//     }
// })
