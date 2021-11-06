import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import {
  degrees,
  PDFDocument,
  rgb,
  StandardFonts,
  encodeToBase64,
  LineCapStyle,
} from "pdf-lib";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import fontkit from "@pdf-lib/fontkit";
import * as DocumentPicker from "expo-document-picker";

const PdfScreen = ({ route, navigation }) => {
  const [pdfloaded, setPdfDoc] = useState();

  const fillForm = async () => {
    let docUri;
    const pickDocument = async () => {
      let result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      console.log(result);
      docUri = result.uri;
    };
    await pickDocument();

    const formPdfBytes = await FileSystem.readAsStringAsync(docUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const pdfDoc = await PDFDocument.load(formPdfBytes);
    // console.log(pdfDoc.context.header.toString());

    // Embed the Mario and emblem images
    // const marioImage = await pdfDoc.embedPng(marioImageBytes);
    // const emblemImage = await pdfDoc.embedPng(emblemImageBytes);

    // Get the form containing all the fields
    const form = pdfDoc.getForm();

    // Get all fields in the PDF by their names
    const nameField = form.getTextField("name");
    const genderField = form.getTextField("gender");
    const pesoField = form.getTextField("peso");
    const motivoField = form.getTextField("motivo");
    // const ageField = form.getTextField("Age");
    // const heightField = form.getTextField("Height");
    // const weightField = form.getTextField("Weight");
    // const eyesField = form.getTextField("Eyes");
    // const skinField = form.getTextField("Skin");
    // const hairField = form.getTextField("Hair");

    // const alliesField = form.getTextField("Allies");
    // const factionField = form.getTextField("FactionName");
    // const backstoryField = form.getTextField("Backstory");
    // const traitsField = form.getTextField("Feat+Traits");
    // const treasureField = form.getTextField("Treasure");

    // const characterImageField = form.getButton("CHARACTER IMAGE");
    // const factionImageField = form.getTextField("Faction Symbol Image");

    // Fill in the basic info fields

    nameField.setText("Carlos");
    genderField.setText("Masculino");
    pesoField.setText("192");
    motivoField.setText(
      "el motivo por este visito es para probar la applicacion y blah blah estoy probando texto largo para llenar espacio."
    );
    // ageField.setText("24 years");
    // heightField.setText(`5' 1"`);
    // weightField.setText("196 lbs");
    // eyesField.setText("blue");
    // skinField.setText("white");
    // hairField.setText("brown");

    // Fill the character image field with our Mario image
    // characterImageField.setImage(marioImage);

    // Fill in the allies field
    // alliesField.setText(
    //   [
    //     `Allies:`,
    //     `  • Princess Daisy`,
    //     `  • Princess Peach`,
    //     `  • Rosalina`,
    //     `  • Geno`,
    //     `  • Luigi`,
    //     `  • Donkey Kong`,
    //     `  • Yoshi`,
    //     `  • Diddy Kong`,
    //     ``,
    //     `Organizations:`,
    //     `  • Italian Plumbers Association`,
    //   ].join("\n")
    // );

    // // Fill in the faction name field
    // factionField.setText(`Mario's Emblem`);

    // // Fill the faction image field with our emblem image
    // // factionImageField.setImage(emblemImage);

    // // Fill in the backstory field
    // backstoryField.setText(
    //   `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`
    // );

    // // Fill in the traits field
    // traitsField.setText(
    //   [
    //     `Mario can use three basic three power-ups:`,
    //     `  • the Super Mushroom, which causes Mario to grow larger`,
    //     `  • the Fire Flower, which allows Mario to throw fireballs`,
    //     `  • the Starman, which gives Mario temporary invincibility`,
    //   ].join("\n")
    // );

    // // Fill in the treasure field
    // treasureField.setText(["• Gold coins", "• Treasure chests"].join("\n"));

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.saveAsBase64();
    // console.log(pdfBytes);

    const uri = FileSystem.documentDirectory + `historiaclinic.pdf`;
    // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    FileSystem.writeAsStringAsync(uri, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    });
    Sharing.shareAsync(uri);
  };

  const createDoc = async () => {
    console.log("getting started");
    const pdfDoc = await PDFDocument.create();
    // const marioUrl = "https://pdf-lib.js.org/assets/small_mario.png";

    const page = pdfDoc.addPage([550, 750]);

    const form = pdfDoc.getForm();

    page.drawText("Enter your favorite superhero:", {
      x: 50,
      y: 700,
      size: 20,
    });

    const superheroField = form.createTextField("favorite.superhero");
    superheroField.setText("One Punch Man");
    superheroField.addToPage(page, { x: 55, y: 640 });

    page.drawText("Select your favorite rocket:", { x: 50, y: 600, size: 20 });

    page.drawText("Falcon Heavy", { x: 120, y: 560, size: 18 });
    page.drawText("Saturn IV", { x: 120, y: 500, size: 18 });
    page.drawText("Delta IV Heavy", { x: 340, y: 560, size: 18 });
    page.drawText("Space Launch System", { x: 340, y: 500, size: 18 });

    const rocketField = form.createRadioGroup("favorite.rocket");
    rocketField.addOptionToPage("Falcon Heavy", page, { x: 55, y: 540 });
    rocketField.addOptionToPage("Saturn IV", page, { x: 55, y: 480 });
    rocketField.addOptionToPage("Delta IV Heavy", page, { x: 275, y: 540 });
    rocketField.addOptionToPage("Space Launch System", page, {
      x: 275,
      y: 480,
    });
    rocketField.select("Saturn IV");

    // const marioImage = await pdfDoc.embedPng(marioUrl);

    page.drawText("Select your favorite gundams:", { x: 50, y: 440, size: 20 });

    page.drawText("Exia", { x: 120, y: 400, size: 18 });
    page.drawText("Kyrios", { x: 120, y: 340, size: 18 });
    page.drawText("Virtue", { x: 340, y: 400, size: 18 });
    page.drawText("Dynames", { x: 340, y: 340, size: 18 });

    const exiaField = form.createCheckBox("gundam.exia");
    const kyriosField = form.createCheckBox("gundam.kyrios");
    const virtueField = form.createCheckBox("gundam.virtue");
    const dynamesField = form.createCheckBox("gundam.dynames");

    exiaField.addToPage(page, { x: 55, y: 380 });
    kyriosField.addToPage(page, { x: 55, y: 320 });
    virtueField.addToPage(page, { x: 275, y: 380 });
    dynamesField.addToPage(page, { x: 275, y: 320 });

    exiaField.check();
    dynamesField.check();

    page.drawText("Select your favorite planet*:", { x: 50, y: 280, size: 20 });

    const planetsField = form.createDropdown("favorite.planet");
    planetsField.addOptions(["Venus", "Earth", "Mars", "Pluto"]);
    planetsField.select("Pluto");
    planetsField.addToPage(page, { x: 55, y: 220 });

    page.drawText("Select your favorite person:", { x: 50, y: 180, size: 18 });

    const personField = form.createOptionList("favorite.person");
    personField.addOptions([
      "Julius Caesar",
      "Ada Lovelace",
      "Cleopatra",
      "Aaron Burr",
      "Mark Antony",
    ]);
    personField.select("Ada Lovelace");
    personField.addToPage(page, { x: 55, y: 70 });

    page.drawText(`* Pluto should be a planet too!`, {
      x: 15,
      y: 15,
      size: 15,
    });

    console.log("maybe sumn is created");
    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.saveAsBase64();
    // const buff = Buffer.from(pdfBytes, "base64");
    // var result = buff.toString("base64");
    const uri = FileSystem.documentDirectory + `test.pdf`;
    // // console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
    FileSystem.writeAsStringAsync(uri, pdfBytes, {
      encoding: FileSystem.EncodingType.Base64,
    });
    // console.log(uri);
    console.log("this a doc", pdfBytes);

    Sharing.shareAsync(uri);
  };
  return (
    <View style={styles.FlatList}>
      <Text>PdfScreen</Text>
      <Button
        title="Choose a doc"
        onPress={() => {
          chooseDoc();
        }}
      />
      <Button
        title="Fill Form"
        onPress={() => {
          fillForm();
        }}
      />
      <Button
        title="create a doc"
        onPress={() => {
          createDoc();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PdfScreen;
