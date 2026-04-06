export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

const author = {
  name: "Anwar Nasir",
  avatar: "/developer-portrait.png",
  role: "Senior Mobile Engineer",
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "flutter-riverpod-clean-architecture",
    title: "Flutter + Riverpod: Clean Architecture That Scales",
    excerpt:
      "A practical guide to structuring Flutter apps with Riverpod for state management. Learn how to build maintainable, testable, and scalable mobile applications.",
    content: `
## Introduction

After shipping 9+ Flutter apps, I've settled on an architecture pattern that consistently delivers clean, maintainable code. Let me walk you through how I structure my Flutter projects using Riverpod.

## Why Riverpod Over Other Solutions?

I've tried them all — Provider, BLoC, GetX, MobX. Here's why Riverpod wins for me:

- **Compile-safe**: No runtime errors from missing providers
- **Testable**: Every provider can be overridden in tests
- **No BuildContext dependency**: Access state anywhere
- **Auto-dispose**: Memory management out of the box

## Project Structure

Here's the structure I use in production apps like **Noor** and **NativeChat**:

\`\`\`
lib/
├── core/
│   ├── constants/
│   ├── extensions/
│   ├── theme/
│   └── utils/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   └── sources/
│   │   ├── domain/
│   │   │   └── entities/
│   │   └── presentation/
│   │       ├── providers/
│   │       ├── screens/
│   │       └── widgets/
│   └── home/
│       └── ...
├── shared/
│   ├── providers/
│   └── widgets/
└── main.dart
\`\`\`

## Defining Providers

The key is keeping providers focused and composable:

\`\`\`dart
// A simple async provider for fetching prayer times
@riverpod
Future<List<PrayerTime>> prayerTimes(PrayerTimesRef ref) async {
  final location = await ref.watch(locationProvider.future);
  final repository = ref.read(prayerRepositoryProvider);
  return repository.getPrayerTimes(location);
}

// A notifier for managing user preferences
@riverpod
class UserPreferences extends _$UserPreferences {
  @override
  UserSettings build() => UserSettings.defaults();

  void updateTheme(AppTheme theme) {
    state = state.copyWith(theme: theme);
    ref.read(storageProvider).saveSettings(state);
  }
}
\`\`\`

## Repository Pattern

Keep your data layer clean with repository interfaces:

\`\`\`dart
abstract class PrayerRepository {
  Future<List<PrayerTime>> getPrayerTimes(Location location);
  Future<void> cachePrayerTimes(List<PrayerTime> times);
}

class PrayerRepositoryImpl implements PrayerRepository {
  final ApiClient _api;
  final LocalStorage _cache;

  PrayerRepositoryImpl(this._api, this._cache);

  @override
  Future<List<PrayerTime>> getPrayerTimes(Location location) async {
    try {
      final times = await _api.fetchPrayerTimes(location);
      await cachePrayerTimes(times);
      return times;
    } catch (e) {
      // Fallback to cache
      return _cache.getPrayerTimes();
    }
  }
}
\`\`\`

## Key Takeaways

1. **Feature-first organization** — group by feature, not by type
2. **One provider, one job** — keep providers small and composable
3. **Repository pattern** — abstract data sources behind interfaces
4. **Riverpod code generation** — use \`@riverpod\` annotations for less boilerplate

This architecture has served me well across multiple production apps. Start simple, scale when needed.
    `,
    date: "Mar 15, 2026",
    readTime: "10 min read",
    category: "flutter",
    tags: ["flutter", "riverpod", "architecture"],
    author,
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    slug: "integrating-gemini-ai-flutter-apps",
    title: "Integrating Gemini AI Into Flutter Apps",
    excerpt:
      "A step-by-step guide to adding Google's Gemini AI to your Flutter apps. Build intelligent features like chat, summarization, and context-aware assistants.",
    content: `
## Why Gemini in Flutter?

Google's Gemini models are incredibly powerful for building AI features in mobile apps. I used Gemini extensively in **NativeChat** and **Noor** to create context-aware assistants. Here's how you can do the same.

## Setting Up

First, add the Gemini package:

\`\`\`yaml
dependencies:
  google_generative_ai: ^0.4.0
\`\`\`

## Initialize the Model

\`\`\`dart
import 'package:google_generative_ai/google_generative_ai.dart';

class GeminiService {
  late final GenerativeModel _model;
  late final ChatSession _chat;

  GeminiService(String apiKey) {
    _model = GenerativeModel(
      model: 'gemini-2.0-flash',
      apiKey: apiKey,
      generationConfig: GenerationConfig(
        temperature: 0.7,
        maxOutputTokens: 2048,
      ),
    );
    _chat = _model.startChat();
  }

  Future<String> sendMessage(String message) async {
    final response = await _chat.sendMessage(
      Content.text(message),
    );
    return response.text ?? 'No response';
  }
}
\`\`\`

## Building a Chat UI

The trick is streaming responses for a natural feel:

\`\`\`dart
Stream<String> streamResponse(String prompt) async* {
  final response = _model.generateContentStream([
    Content.text(prompt),
  ]);

  await for (final chunk in response) {
    if (chunk.text != null) {
      yield chunk.text!;
    }
  }
}
\`\`\`

Then in your widget:

\`\`\`dart
StreamBuilder<String>(
  stream: geminiService.streamResponse(userMessage),
  builder: (context, snapshot) {
    return AnimatedText(
      text: snapshot.data ?? '',
      style: Theme.of(context).textTheme.bodyMedium,
    );
  },
)
\`\`\`

## Adding Context Awareness

What makes NativeChat special is context awareness. You can pass system instructions:

\`\`\`dart
final model = GenerativeModel(
  model: 'gemini-2.0-flash',
  apiKey: apiKey,
  systemInstruction: Content.text(
    'You are a helpful assistant that understands '
    'Ethiopian culture and languages. Respond in '
    'the same language the user writes in.',
  ),
);
\`\`\`

## Best Practices

1. **Stream responses** — never make users wait for full generation
2. **Cache conversations** — use Hive or SQLite for chat history
3. **Handle errors gracefully** — network issues are common on mobile
4. **Rate limit** — respect API quotas, implement local throttling
5. **Secure API keys** — never hardcode, use \`--dart-define\` or env files

## Conclusion

Gemini + Flutter is a powerful combination. The streaming API makes it feel native, and the multimodal capabilities open up endless possibilities.
    `,
    date: "Feb 20, 2026",
    readTime: "8 min read",
    category: "ai",
    tags: ["flutter", "gemini", "ai"],
    author,
    featured: true,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    slug: "flutter-home-screen-widgets-guide",
    title: "Building Flutter Home Screen Widgets for Android",
    excerpt:
      "How I built the Ethio Cal home screen widget — a complete guide to creating native Android widgets from your Flutter app using Kotlin.",
    content: `
## The Challenge

Flutter doesn't natively support home screen widgets. When I built **Ethio Cal**, I needed a resizable widget that updates dynamically. Here's exactly how I did it.

## Architecture Overview

The widget runs as a native Android component alongside your Flutter app:

\`\`\`
┌─────────────────────────────┐
│  Flutter App (Dart)         │
│  └── Shared data layer      │
│       └── Method Channel ───┼──► Native Widget (Kotlin)
│                             │    └── AppWidgetProvider
└─────────────────────────────┘
\`\`\`

## Step 1: Create the Widget Layout

Create \`res/layout/ethio_cal_widget.xml\`:

\`\`\`xml
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@drawable/widget_background"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/ethiopian_date"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="24sp"
        android:textColor="@color/white"
        android:fontFamily="sans-serif-medium" />

    <TextView
        android:id="@+id/gregorian_date"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="14sp"
        android:textColor="@color/white_70" />
</LinearLayout>
\`\`\`

## Step 2: Widget Provider in Kotlin

\`\`\`kotlin
class EthioCalWidget : AppWidgetProvider() {
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (appWidgetId in appWidgetIds) {
            val views = RemoteViews(
                context.packageName,
                R.layout.ethio_cal_widget
            )

            val ethDate = EthiopianCalendar.today()
            views.setTextViewText(
                R.id.ethiopian_date,
                ethDate.formatted()
            )
            views.setTextViewText(
                R.id.gregorian_date,
                SimpleDateFormat("MMM dd, yyyy").format(Date())
            )

            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
\`\`\`

## Step 3: Bridge with Method Channels

\`\`\`dart
class WidgetService {
  static const _channel = MethodChannel('com.anexon.ethiocal/widget');

  static Future<void> updateWidget() async {
    await _channel.invokeMethod('updateWidget');
  }
}
\`\`\`

## Step 4: Make It Resizable

In \`res/xml/ethio_cal_widget_info.xml\`:

\`\`\`xml
<appwidget-provider
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:minWidth="110dp"
    android:minHeight="40dp"
    android:resizeMode="horizontal|vertical"
    android:widgetCategory="home_screen"
    android:updatePeriodMillis="86400000" />
\`\`\`

## Key Lessons

- **Keep widget code native** — don't try to render Flutter in a widget
- **Share data via SharedPreferences** — both Flutter and Kotlin can read/write
- **Schedule updates** — use \`AlarmManager\` for reliable background updates
- **Test on real devices** — emulator widget behavior can differ

This approach gave Ethio Cal a beautiful, performant home screen presence without compromising the Flutter app experience.
    `,
    date: "Jan 28, 2026",
    readTime: "12 min read",
    category: "flutter",
    tags: ["flutter", "android", "widgets", "kotlin"],
    author,
    featured: false,
    color: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: 4,
    slug: "supabase-flutter-realtime-apps",
    title: "Building Real-Time Apps with Supabase & Flutter",
    excerpt:
      "How I built JMarket's real-time features using Supabase. Authentication, real-time database, storage, and row-level security in Flutter.",
    content: `
## Why Supabase?

When building **JMarket**, I needed a backend that could handle authentication, real-time data, and file storage without the complexity of Firebase. Supabase was the perfect fit.

## Setting Up

\`\`\`yaml
dependencies:
  supabase_flutter: ^2.0.0
\`\`\`

Initialize in \`main.dart\`:

\`\`\`dart
await Supabase.initialize(
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_ANON_KEY',
);
\`\`\`

## Authentication Made Simple

\`\`\`dart
class AuthService {
  final _supabase = Supabase.instance.client;

  Future<AuthResponse> signUp(String email, String password) async {
    return await _supabase.auth.signUp(
      email: email,
      password: password,
    );
  }

  Future<AuthResponse> signIn(String email, String password) async {
    return await _supabase.auth.signInWithPassword(
      email: email,
      password: password,
    );
  }

  // Listen to auth state changes
  Stream<AuthState> get authStateChanges =>
      _supabase.auth.onAuthStateChange;
}
\`\`\`

## Real-Time Product Updates

This is where Supabase shines. In JMarket, sellers see instant updates when products are purchased:

\`\`\`dart
final stream = Supabase.instance.client
    .from('products')
    .stream(primaryKey: ['id'])
    .eq('seller_id', currentUserId)
    .order('created_at');

// In your widget
StreamBuilder<List<Map<String, dynamic>>>(
  stream: stream,
  builder: (context, snapshot) {
    if (!snapshot.hasData) return const Loading();
    final products = snapshot.data!
        .map((json) => Product.fromJson(json))
        .toList();
    return ProductGrid(products: products);
  },
)
\`\`\`

## Row-Level Security

Protect your data at the database level:

\`\`\`sql
-- Users can only read their own orders
CREATE POLICY "users_own_orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Sellers can update their own products
CREATE POLICY "sellers_update_products" ON products
  FOR UPDATE USING (auth.uid() = seller_id);
\`\`\`

## File Storage

Upload product images with ease:

\`\`\`dart
Future<String> uploadProductImage(File image, String productId) async {
  final path = 'products/\$productId/\${DateTime.now().millisecondsSinceEpoch}.jpg';
  await Supabase.instance.client.storage
      .from('product-images')
      .upload(path, image);
  return Supabase.instance.client.storage
      .from('product-images')
      .getPublicUrl(path);
}
\`\`\`

## Lessons from JMarket

1. **Use RLS from day one** — it's much harder to add later
2. **Optimize queries** — Supabase gives you raw SQL power, use it
3. **Cache aggressively** — mobile networks are unreliable
4. **Use Edge Functions** for complex business logic

Supabase + Flutter is a match made in heaven for rapid app development.
    `,
    date: "Jan 10, 2026",
    readTime: "11 min read",
    category: "flutter",
    tags: ["flutter", "supabase", "backend", "realtime"],
    author,
    featured: false,
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 5,
    slug: "building-flutter-sdks-pub-dev",
    title: "How I Built and Published a Flutter SDK to pub.dev",
    excerpt:
      "Lessons learned from building the Hasab AI Flutter SDK. Package architecture, documentation, CI/CD, and publishing best practices.",
    content: `
## The Journey

When I built the **Hasab AI Flutter SDK**, I wanted to make Ethiopian language AI accessible to every Flutter developer. Here's the complete process from zero to published package.

## Package Structure

\`\`\`
hasab_ai_flutter/
├── lib/
│   ├── hasab_ai_flutter.dart    # Public API barrel file
│   ├── src/
│   │   ├── client.dart          # Main client class
│   │   ├── models/
│   │   │   ├── speech.dart
│   │   │   ├── translation.dart
│   │   │   └── chat.dart
│   │   ├── services/
│   │   │   ├── stt_service.dart
│   │   │   ├── tts_service.dart
│   │   │   └── translate_service.dart
│   │   └── utils/
│   │       ├── exceptions.dart
│   │       └── constants.dart
├── example/
├── test/
├── pubspec.yaml
├── README.md
├── CHANGELOG.md
└── LICENSE
\`\`\`

## Designing the Public API

The key is making the SDK feel natural to use:

\`\`\`dart
// Simple, intuitive API
final hasab = HasabAI(apiKey: 'your-key');

// Speech to text
final text = await hasab.speechToText(
  audioFile: file,
  language: HasabLanguage.amharic,
);

// Translation
final result = await hasab.translate(
  text: 'Hello, world!',
  from: HasabLanguage.english,
  to: HasabLanguage.amharic,
);

// Text to speech
final audio = await hasab.textToSpeech(
  text: 'ሰላም',
  language: HasabLanguage.amharic,
);
\`\`\`

## Writing Tests

\`\`\`dart
void main() {
  late HasabAI client;
  late MockHttpClient mockHttp;

  setUp(() {
    mockHttp = MockHttpClient();
    client = HasabAI(
      apiKey: 'test-key',
      httpClient: mockHttp,
    );
  });

  test('translate returns correct result', () async {
    when(mockHttp.post(any, body: anyNamed('body')))
        .thenAnswer((_) async => Response(
          '{"translation": "ሰላም"}', 200));

    final result = await client.translate(
      text: 'Hello',
      from: HasabLanguage.english,
      to: HasabLanguage.amharic,
    );

    expect(result.translation, equals('ሰላም'));
  });
}
\`\`\`

## Publishing Checklist

Before running \`dart pub publish\`:

1. ✅ \`pubspec.yaml\` — complete metadata, proper versioning
2. ✅ \`README.md\` — installation, quick start, full API docs
3. ✅ \`CHANGELOG.md\` — follow Keep a Changelog format
4. ✅ \`example/\` — runnable example app
5. ✅ \`LICENSE\` — MIT or BSD-3 recommended
6. ✅ Tests passing — aim for 80%+ coverage
7. ✅ \`dart analyze\` — zero warnings
8. ✅ \`dart doc\` — generates clean documentation

## Key Lessons

- **Start with the API you want**, then build the implementation
- **Version semantically** — breaking changes = major bump
- **Document everything** — your future self will thank you
- **Add examples** — they're worth more than docs sometimes

Publishing to pub.dev was incredibly rewarding. Seeing other developers use your SDK is the best feeling.
    `,
    date: "Dec 5, 2025",
    readTime: "9 min read",
    category: "flutter",
    tags: ["flutter", "sdk", "pub.dev", "dart"],
    author,
    featured: false,
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    id: 6,
    slug: "material-3-flutter-design-system",
    title: "Mastering Material 3 Design in Flutter",
    excerpt:
      "How to build stunning Flutter UIs with Material 3. Dynamic color, custom themes, typography, and the design principles behind my apps.",
    content: `
## Why Material 3?

Material 3 (Material You) brings dynamic theming and more expressive design options to Flutter. Every app I've shipped in 2025 uses Material 3, and the results speak for themselves.

## Setting Up Material 3

\`\`\`dart
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorSchemeSeed: const Color(0xFF1B5E20), // Your brand color
    brightness: Brightness.light,
  ),
  darkTheme: ThemeData(
    useMaterial3: true,
    colorSchemeSeed: const Color(0xFF1B5E20),
    brightness: Brightness.dark,
  ),
  themeMode: ThemeMode.system,
)
\`\`\`

## Dynamic Color (Android 12+)

\`\`\`dart
import 'package:dynamic_color/dynamic_color.dart';

DynamicColorBuilder(
  builder: (lightDynamic, darkDynamic) {
    return MaterialApp(
      theme: ThemeData(
        colorScheme: lightDynamic ?? _defaultLightScheme,
        useMaterial3: true,
      ),
      darkTheme: ThemeData(
        colorScheme: darkDynamic ?? _defaultDarkScheme,
        useMaterial3: true,
      ),
    );
  },
)
\`\`\`

## Custom Typography

\`\`\`dart
final textTheme = TextTheme(
  displayLarge: GoogleFonts.spaceGrotesk(
    fontSize: 57,
    fontWeight: FontWeight.w400,
  ),
  headlineMedium: GoogleFonts.spaceGrotesk(
    fontSize: 28,
    fontWeight: FontWeight.w600,
  ),
  bodyLarge: GoogleFonts.inter(
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  ),
  labelLarge: GoogleFonts.jetBrainsMono(
    fontSize: 14,
    fontWeight: FontWeight.w500,
  ),
);
\`\`\`

## Component Theming

Customize individual components:

\`\`\`dart
ThemeData(
  cardTheme: CardTheme(
    elevation: 0,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
      side: BorderSide(color: colorScheme.outlineVariant),
    ),
  ),
  filledButtonTheme: FilledButtonThemeData(
    style: FilledButton.styleFrom(
      padding: const EdgeInsets.symmetric(
        horizontal: 24, vertical: 12,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  ),
)
\`\`\`

## Design Principles I Follow

1. **Generous spacing** — let elements breathe
2. **Consistent border radius** — pick a scale and stick to it (8, 12, 16, 24)
3. **Subtle shadows** — M3 uses tonal elevation, not drop shadows
4. **Motion matters** — use \`AnimatedContainer\` and \`Hero\` transitions
5. **Responsive** — design for phones first, then tablets

Material 3 makes Flutter apps look and feel premium. Invest time in your theme, and every screen benefits.
    `,
    date: "Nov 18, 2025",
    readTime: "8 min read",
    category: "flutter",
    tags: ["flutter", "material-3", "design", "ui-ux"],
    author,
    featured: false,
    color: "from-teal-500/20 to-cyan-500/20",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
