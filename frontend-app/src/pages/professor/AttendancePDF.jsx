import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  table: {
    display: "flex",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 1,
    padding: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  bodyText: {
    fontSize: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  }
});

const AttendancePDF = ({ moduleInfo, date, students }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Feuille de Présence</Text>
        <Text style={styles.subtitle}>{moduleInfo?.titre}</Text>
        <Text style={styles.subtitle}>Classe: {moduleInfo?.classe?.nom}</Text>
        <Text style={styles.subtitle}>Date: {new Date(date).toLocaleDateString()}</Text>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>N°</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Nom</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Prénom</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.headerText}>Présence</Text>
          </View>
        </View>
        
        {/* Table Rows */}
        {students.map((student, index) => (
          <View style={styles.tableRow} key={student.id}>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{index + 1}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{student.nom}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>{student.prenom}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.bodyText}>
                {student.present ? '✓ Présent' : '✗ Absent'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Généré le {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

export default AttendancePDF;