import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, ScrollView, TouchableOpacity,
  TextInput, StyleSheet, StatusBar
} from 'react-native';

const COLORS = {
  purple: '#4B247C',
  lavender: '#F0EAF8',
  light: '#FAF9FC',
  white: '#FFFFFF',
  gold: '#D6A83E',
  ink: '#24212B',
  muted: '#6D6877',
  border: '#E5DFED',
  green: '#347A48'
};

const CATEGORIES = [
  ['🏠', 'Housing & shelter'],
  ['🛡️', 'Domestic violence & safety'],
  ['🥫', 'Food & basic needs'],
  ['💼', 'Employment & job support'],
  ['🚌', 'Transportation'],
  ['👨‍👩‍👧', 'Childcare & family'],
  ['⚖️', 'Legal assistance'],
  ['🩺', 'Healthcare'],
  ['🧠', 'Mental wellness'],
  ['📚', 'Education & training']
];

const RESOURCES = [
  { name: 'The Samaritan Inn', category: 'Housing & shelter', area: 'McKinney, TX', status: 'Needs current confirmation' },
  { name: 'Family Promise of Collin County', category: 'Housing & shelter', area: 'Collin County, TX', status: 'Needs current confirmation' },
  { name: 'Hope’s Door New Beginning Center', category: 'Domestic violence & safety', area: 'Plano, TX', status: 'Needs current confirmation' },
  { name: 'All Community Outreach', category: 'Food & basic needs', area: 'Allen, TX', status: 'Needs current confirmation' }
];

function PrimaryButton({ title, onPress, secondary = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.secondaryButton]}>
      <Text style={[styles.buttonText, secondary && styles.secondaryButtonText]}>{title}</Text>
    </TouchableOpacity>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.logoMark}><Text style={styles.logoHeart}>♥</Text></View>
      <View>
        <Text style={styles.brand}>FEEL AT HOME CONNECT</Text>
        <Text style={styles.tagline}>A Safe Place. A New Beginning.</Text>
      </View>
    </View>
  );
}

function Home({ goTo }) {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>WELCOME</Text>
        <Text style={styles.heroTitle}>One Connection{ '\n' }Can Change Everything.</Text>
        <Text style={styles.heroText}>Find support, make a plan, and take your next step toward safety, stability, and independence.</Text>
        <PrimaryButton title="Find Help Near Me" onPress={() => goTo('Find Help')} />
      </View>

      <Text style={styles.sectionTitle}>What do you need today?</Text>
      <View style={styles.categoryGrid}>
        {CATEGORIES.slice(0, 6).map(([icon, label]) => (
          <TouchableOpacity key={label} style={styles.categoryCard} onPress={() => goTo('Find Help')}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.planBanner}>
        <Text style={styles.bannerTitle}>Your Start Over Plan</Text>
        <Text style={styles.bannerText}>Small steps count. Create a personal plan at your own pace.</Text>
        <PrimaryButton title="Open My Plan" secondary onPress={() => goTo('My Plan')} />
      </View>
      <Text style={styles.disclaimer}>If you are in immediate danger, call 911. This prototype does not provide emergency dispatch or guarantee that a listed service has space available.</Text>
    </ScrollView>
  );
}

function FindHelp() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const filtered = RESOURCES.filter(r =>
    (!selected || r.category === selected) &&
    (r.name.toLowerCase().includes(query.toLowerCase()) ||
     r.category.toLowerCase().includes(query.toLowerCase()) ||
     r.area.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.pageTitle}>Find Help</Text>
      <Text style={styles.subtitle}>Explore services and resources in your community.</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search resources or city"
        placeholderTextColor={COLORS.muted}
        style={styles.search}
      />
      <Text style={styles.sectionTitle}>Browse by need</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        <TouchableOpacity style={[styles.chip, !selected && styles.chipActive]} onPress={() => setSelected('')}>
          <Text style={[styles.chipText, !selected && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {CATEGORIES.map(([icon, label]) => (
          <TouchableOpacity key={label} style={[styles.chip, selected === label && styles.chipActive]} onPress={() => setSelected(selected === label ? '' : label)}>
            <Text style={[styles.chipText, selected === label && styles.chipTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {filtered.map(resource => (
        <View key={resource.name} style={styles.resourceCard}>
          <View style={styles.resourceTop}>
            <Text style={styles.resourceName}>{resource.name}</Text>
            <Text style={styles.badge}>DEMO</Text>
          </View>
          <Text style={styles.resourceCategory}>{resource.category}</Text>
          <Text style={styles.resourceArea}>{resource.area}</Text>
          <Text style={styles.statusText}>● {resource.status}</Text>
          <Text style={styles.smallText}>Confirm eligibility, hours, and capacity directly with the provider before traveling.</Text>
          <TouchableOpacity onPress={() => {}}><Text style={styles.linkText}>View resource details →</Text></TouchableOpacity>
        </View>
      ))}
      {filtered.length === 0 && <Text style={styles.empty}>No sample results match. Try another search or category.</Text>}
    </ScrollView>
  );
}

function MyPlan() {
  const [tasks, setTasks] = useState([
    { title: 'Identify one immediate need', done: false },
    { title: 'Save a resource to contact', done: false },
    { title: 'Choose a next step for this week', done: false }
  ]);
  const toggle = index => setTasks(old => old.map((t, i) => i === index ? { ...t, done: !t.done } : t));
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.pageTitle}>My Start Over Plan</Text>
      <Text style={styles.subtitle}>You decide what comes next. Your plan can change whenever you need it to.</Text>
      {['RIGHT NOW', 'THIS WEEK', 'THIS MONTH', 'MY FUTURE'].map((period, idx) => (
        <View key={period} style={styles.planSection}>
          <Text style={styles.period}>{period}</Text>
          {(idx === 0 ? tasks : []).map((task, i) => (
            <TouchableOpacity key={task.title} style={styles.taskRow} onPress={() => toggle(i)}>
              <View style={[styles.checkbox, task.done && styles.checkboxDone]}>{task.done ? <Text style={styles.check}>✓</Text> : null}</View>
              <Text style={[styles.taskText, task.done && styles.taskDone]}>{task.title}</Text>
            </TouchableOpacity>
          ))}
          {idx !== 0 && <Text style={styles.mutedText}>Add a goal when you’re ready.</Text>}
        </View>
      ))}
      <Text style={styles.disclaimer}>This is a local demonstration. Do not enter sensitive personal or abuse details in this prototype.</Text>
    </ScrollView>
  );
}

function Saved() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.pageTitle}>Saved Resources</Text>
      <Text style={styles.subtitle}>Resources you choose to keep close will appear here.</Text>
      <View style={styles.emptyCard}>
        <Text style={styles.emptyIcon}>☆</Text>
        <Text style={styles.sectionTitle}>Your resource vault is ready</Text>
        <Text style={styles.mutedText}>When saving is connected, you’ll be able to organize resources and keep important contacts handy.</Text>
      </View>
    </ScrollView>
  );
}

function Profile() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.pageTitle}>Profile & Safety</Text>
      <View style={styles.safetyCard}>
        <Text style={styles.sectionTitle}>Safety Center</Text>
        <Text style={styles.bodyText}>Your privacy and safety matter. This early prototype does not store a profile or send information to a server.</Text>
        <PrimaryButton title="Call 911 for immediate danger" secondary onPress={() => {}} />
        <Text style={styles.smallText}>Quick Exit, private app lock, secure data clearing, and vetted support contacts must be implemented and safety-reviewed before launch.</Text>
      </View>
      <View style={styles.resourceCard}>
        <Text style={styles.sectionTitle}>Pilot location</Text>
        <Text style={styles.bodyText}>Collin County, Texas</Text>
        <Text style={styles.smallText}>Resource listings shown elsewhere in this demo are examples only and require re-verification before public release.</Text>
      </View>
    </ScrollView>
  );
}

export default function App() {
  const [tab, setTab] = useState('Home');
  const screens = {
    'Home': <Home goTo={setTab} />,
    'Find Help': <FindHelp />,
    'My Plan': <MyPlan />,
    'Saved': <Saved />,
    'Profile': <Profile />
  };
  const tabs = [['⌂', 'Home'], ['⌕', 'Find Help'], ['✓', 'My Plan'], ['☆', 'Saved'], ['☻', 'Profile']];
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.light} />
      <Header />
      <View style={styles.content}>{screens[tab]}</View>
      <View style={styles.nav}>
        {tabs.map(([icon, label]) => (
          <TouchableOpacity key={label} onPress={() => setTab(label)} style={[styles.navItem, tab === label && styles.navActive]}>
            <Text style={[styles.navIcon, tab === label && styles.navTextActive]}>{icon}</Text>
            <Text style={[styles.navLabel, tab === label && styles.navTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.light },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 14, backgroundColor: COLORS.white, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  logoMark: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.purple, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  logoHeart: { color: COLORS.white, fontSize: 24 },
  brand: { color: COLORS.purple, fontWeight: '800', fontSize: 15, letterSpacing: 0.3 },
  tagline: { color: COLORS.muted, fontSize: 11, marginTop: 3 },
  content: { flex: 1 },
  page: { padding: 20, paddingBottom: 28 },
  hero: { backgroundColor: COLORS.purple, borderRadius: 24, padding: 24, marginBottom: 24 },
  eyebrow: { color: '#E5D7FF', fontSize: 11, fontWeight: '800', letterSpacing: 2, marginBottom: 12 },
  heroTitle: { color: COLORS.white, fontSize: 30, fontWeight: '800', lineHeight: 36, marginBottom: 12 },
  heroText: { color: '#F5F0FC', fontSize: 15, lineHeight: 22, marginBottom: 22 },
  button: { backgroundColor: COLORS.gold, paddingVertical: 14, paddingHorizontal: 18, borderRadius: 13, alignItems: 'center', marginTop: 10 },
  buttonText: { color: COLORS.ink, fontWeight: '800', fontSize: 15 },
  secondaryButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  secondaryButtonText: { color: COLORS.purple },
  sectionTitle: { color: COLORS.ink, fontWeight: '800', fontSize: 19, marginBottom: 14 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '48%', backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 15, marginBottom: 12, minHeight: 110 },
  categoryIcon: { fontSize: 24, marginBottom: 10 },
  categoryLabel: { color: COLORS.ink, fontWeight: '700', fontSize: 13, lineHeight: 18 },
  planBanner: { backgroundColor: COLORS.lavender, borderRadius: 18, padding: 18, marginTop: 10 },
  bannerTitle: { color: COLORS.purple, fontSize: 19, fontWeight: '800', marginBottom: 6 },
  bannerText: { color: COLORS.muted, fontSize: 14, lineHeight: 20 },
  disclaimer: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 20 },
  pageTitle: { color: COLORS.purple, fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: COLORS.muted, fontSize: 14, lineHeight: 21, marginBottom: 20 },
  search: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 13, padding: 14, fontSize: 15, marginBottom: 20, color: COLORS.ink },
  chip: { paddingVertical: 9, paddingHorizontal: 13, borderRadius: 22, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
  chipActive: { backgroundColor: COLORS.purple, borderColor: COLORS.purple },
  chipText: { color: COLORS.muted, fontSize: 12, fontWeight: '600' },
  chipTextActive: { color: COLORS.white },
  resourceCard: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 17, marginBottom: 13 },
  resourceTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  resourceName: { color: COLORS.ink, fontWeight: '800', fontSize: 17, flex: 1, paddingRight: 8 },
  badge: { color: COLORS.purple, backgroundColor: COLORS.lavender, fontSize: 9, fontWeight: '800', paddingVertical: 5, paddingHorizontal: 7, borderRadius: 7 },
  resourceCategory: { color: COLORS.purple, fontSize: 13, fontWeight: '700', marginTop: 7 },
  resourceArea: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  statusText: { color: '#8A5A16', fontSize: 12, marginTop: 11, fontWeight: '700' },
  smallText: { color: COLORS.muted, fontSize: 11, lineHeight: 16, marginTop: 8 },
  linkText: { color: COLORS.purple, fontWeight: '800', fontSize: 13, marginTop: 13 },
  empty: { color: COLORS.muted, textAlign: 'center', marginTop: 30 },
  planSection: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border, borderRadius: 16, padding: 17, marginBottom: 14 },
  period: { color: COLORS.purple, fontSize: 12, fontWeight: '900', letterSpacing: 1.2, marginBottom: 12 },
  taskRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  checkbox: { width: 23, height: 23, borderRadius: 7, borderWidth: 1.5, borderColor: COLORS.purple, marginRight: 12, alignItems: 'center', justifyContent: 'center' },
  checkboxDone: { backgroundColor: COLORS.green, borderColor: COLORS.green },
  check: { color: COLORS.white, fontWeight: '900' },
  taskText: { color: COLORS.ink, fontSize: 14, flex: 1 },
  taskDone: { color: COLORS.muted, textDecorationLine: 'line-through' },
  mutedText: { color: COLORS.muted, fontSize: 13, lineHeight: 19 },
  emptyCard: { backgroundColor: COLORS.white, borderRadius: 18, padding: 25, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, marginTop: 12 },
  emptyIcon: { fontSize: 42, color: COLORS.gold, marginBottom: 10 },
  safetyCard: { backgroundColor: COLORS.lavender, borderRadius: 18, padding: 18, marginBottom: 16 },
  bodyText: { color: COLORS.ink, fontSize: 14, lineHeight: 21 },
  nav: { flexDirection: 'row', backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 8, paddingBottom: 7, paddingHorizontal: 4 },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 7, borderRadius: 13 },
  navActive: { backgroundColor: COLORS.lavender },
  navIcon: { color: COLORS.muted, fontSize: 22, lineHeight: 25 },
  navLabel: { color: COLORS.muted, fontSize: 10, fontWeight: '600', marginTop: 2 },
  navTextActive: { color: COLORS.purple, fontWeight: '900' }
});
