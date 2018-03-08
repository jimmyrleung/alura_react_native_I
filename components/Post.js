import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image, Dimensions, ScrollView, FlatList, TouchableOpacity, TextInput
} from 'react-native';

const window = Dimensions.get('window');
const width = window.width;
//const height = window.height;

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foto: this.props.foto
        };
        this.commentText = "";
    };

    carregaIcone(isLiked) {
        return isLiked ? require('../assets/img/s2-checked.png') : require('../assets/img/s2.png');
    };

    like() {
        // como queremos alterar só uma propriedade, utilizamos o spread operator pra replicar as demais
        // TODO: enviar para o servidor e recalcular o número de likes
        this.setState({ foto: { ...this.state.foto, isLiked: !this.state.foto.isLiked } });
    }

    comment() {
        if (this.commentText.length === 0) return;
        this.state.foto.comments.push({ username: "jimmyrl", text: this.commentText });
        this.setState({ foto: { ...this.state.foto } });
        this.inputComentario.clear();
        this.commentText = "";
    }

    getNumberOfLikes(likers) {
        if (likers.length === 0) return "";
        if (likers.length === 1) return `1 like`;
        return `${likers.length} likes`;
    }

    render() {
        // Extrair a propriedade foto do estado (Object destructuring)
        const { foto } = this.state;
        return (
            <View>
                {/* Se quisermos utilizar mais de uma propriedade definida em um stylesheet podemos passar um array de estilos:
                    style={ [styles.foo, styles.bar] }

                    Caso seja inline, basta passar um objeto:
                    style={ {foo:20, bar:30} }
                */}
                <View style={[styles.rowCenteredView, styles.m5, styles.mb10]}>
                    <Image style={styles.headerImage} source={{ uri: 'https://instagram.fcgh9-1.fna.fbcdn.net/vp/6170cb0de16a8ec01b9760e19a69b600/5B2B15DA/t51.2885-19/10518184_411719108989377_1218968099_a.jpg' }} />
                    <Text>{foto.username}</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Image style={styles.photo} source={{ uri: foto.url }} />
                </View>
                {/* <Image style={styles.photo} source={require('../assets/img/iaintzelda.jpg')} /> */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={this.like.bind(this)}>
                        <Image style={styles.imageButton} source={this.carregaIcone(foto.isLiked)} />
                    </TouchableOpacity>
                    <Text>{this.getNumberOfLikes(foto.likers)}</Text>
                    <View style={styles.rowCenteredView}><Text style={styles.usernameLink}>{foto.username}</Text><Text>{foto.description}</Text></View>
                    {/* {foto.comments.map(comment => {
                        return <View style={styles.rowCenteredView}><Text style={styles.usernameLink}>{`${comment.username}`}</Text><Text>{comment.text}</Text></View>;
                    })} */}
                    <FlatList
                        data={foto.comments}
                        renderItem={({ item }) =>
                            <View style={styles.rowCenteredView}><Text style={styles.usernameLink}>{`${item.username}`}</Text><Text>{item.text}</Text></View>
                        }
                    />
                    <View style={[styles.rowCenteredView, styles.mb10]}>
                        <TextInput
                            ref={input => this.inputComentario = input}
                            onChangeText={(text) => this.commentText = text}
                            underlineColorAndroid="transparent"
                            style={styles.comment} placeholder="Add comment..." />
                        <TouchableOpacity onPress={this.comment.bind(this)}>
                            <Image style={styles.imageButton} source={require('../assets/img/send.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    m5: { margin: 5 },
    mb10: { marginBottom: 10 },
    headerImage: { width: 30, height: 30, borderRadius: 20, marginRight: 4 },
    photo: { width: width, height: 300 },
    imageButton: { height: 30, width: 30 },
    //footer: { margin: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    footer: { margin: 10 },
    rowCenteredView: { flexDirection: 'row', alignItems: 'center' },
    usernameLink: { fontWeight: 'bold', marginRight: 5 },
    comment: { height: 30, flex: 1 }
});