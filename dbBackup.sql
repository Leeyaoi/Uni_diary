PGDMP      +                |            uniDiary    16.3    16.3 E    U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            V           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            W           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            X           1262    22511    uniDiary    DATABASE     �   CREATE DATABASE "uniDiary" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1251';
    DROP DATABASE "uniDiary";
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            Y           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    27752    admins    TABLE       CREATE TABLE public.admins (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid,
    "facultyId" uuid
);
    DROP TABLE public.admins;
       public         heap    postgres    false    4            �            1259    27863    attendances    TABLE       CREATE TABLE public.attendances (
    id uuid NOT NULL,
    "dateWhen" date NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "studentId" uuid,
    "courseId" uuid,
    lection boolean NOT NULL
);
    DROP TABLE public.attendances;
       public         heap    postgres    false    4            �            1259    27903    classes    TABLE     �  CREATE TABLE public.classes (
    id uuid NOT NULL,
    building integer NOT NULL,
    hall integer NOT NULL,
    "fullGroup" boolean NOT NULL,
    "firstHalf" boolean NOT NULL,
    number integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "teacherId" uuid,
    "courseId" uuid,
    "timetableId" uuid,
    lection boolean NOT NULL
);
    DROP TABLE public.classes;
       public         heap    postgres    false    4            �            1259    27820    courses    TABLE     �   CREATE TABLE public.courses (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.courses;
       public         heap    postgres    false    4            �            1259    27747 	   faculties    TABLE     �   CREATE TABLE public.faculties (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.faculties;
       public         heap    postgres    false    4            �            1259    27781    groups    TABLE     �   CREATE TABLE public.groups (
    id uuid NOT NULL,
    year integer NOT NULL,
    num integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "professionId" uuid
);
    DROP TABLE public.groups;
       public         heap    postgres    false    4            �            1259    27825    m2m_group_courses    TABLE     �   CREATE TABLE public.m2m_group_courses (
    id uuid NOT NULL,
    hours numeric NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "courseId" uuid,
    "groupId" uuid
);
 %   DROP TABLE public.m2m_group_courses;
       public         heap    postgres    false    4            �            1259    27844    m2m_teacher_courses    TABLE     �   CREATE TABLE public.m2m_teacher_courses (
    id uuid NOT NULL,
    hours numeric NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "courseId" uuid,
    "teacherId" uuid
);
 '   DROP TABLE public.m2m_teacher_courses;
       public         heap    postgres    false    4            �            1259    27878    marks    TABLE     �   CREATE TABLE public.marks (
    id uuid NOT NULL,
    "dateWhen" date NOT NULL,
    mark smallint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "studentId" uuid,
    "courseId" uuid
);
    DROP TABLE public.marks;
       public         heap    postgres    false    4            �            1259    27769    professions    TABLE     :  CREATE TABLE public.professions (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    code character varying(255) NOT NULL,
    "jobTitle" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "facultyId" uuid
);
    DROP TABLE public.professions;
       public         heap    postgres    false    4            �            1259    27791    students    TABLE     8  CREATE TABLE public.students (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    budget boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "groupId" uuid,
    "userId" uuid
);
    DROP TABLE public.students;
       public         heap    postgres    false    4            �            1259    27808    teachers    TABLE     7  CREATE TABLE public.teachers (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    "jobTitle" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" uuid
);
    DROP TABLE public.teachers;
       public         heap    postgres    false    4            �            1259    27893 
   timetables    TABLE     �   CREATE TABLE public.timetables (
    id uuid NOT NULL,
    day smallint NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "groupId" uuid
);
    DROP TABLE public.timetables;
       public         heap    postgres    false    4            �            1259    27740    users    TABLE     �   CREATE TABLE public.users (
    id uuid NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            G          0    27752    admins 
   TABLE DATA           d   COPY public.admins (id, name, surname, "createdAt", "updatedAt", "userId", "facultyId") FROM stdin;
    public          postgres    false    217   _       O          0    27863    attendances 
   TABLE DATA           q   COPY public.attendances (id, "dateWhen", "createdAt", "updatedAt", "studentId", "courseId", lection) FROM stdin;
    public          postgres    false    225   �_       R          0    27903    classes 
   TABLE DATA           �   COPY public.classes (id, building, hall, "fullGroup", "firstHalf", number, "createdAt", "updatedAt", "teacherId", "courseId", "timetableId", lection) FROM stdin;
    public          postgres    false    228   %`       L          0    27820    courses 
   TABLE DATA           E   COPY public.courses (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   �c       F          0    27747 	   faculties 
   TABLE DATA           G   COPY public.faculties (id, name, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   d       I          0    27781    groups 
   TABLE DATA           Y   COPY public.groups (id, year, num, "createdAt", "updatedAt", "professionId") FROM stdin;
    public          postgres    false    219   �d       M          0    27825    m2m_group_courses 
   TABLE DATA           g   COPY public.m2m_group_courses (id, hours, "createdAt", "updatedAt", "courseId", "groupId") FROM stdin;
    public          postgres    false    223   >e       N          0    27844    m2m_teacher_courses 
   TABLE DATA           k   COPY public.m2m_teacher_courses (id, hours, "createdAt", "updatedAt", "courseId", "teacherId") FROM stdin;
    public          postgres    false    224   �e       P          0    27878    marks 
   TABLE DATA           h   COPY public.marks (id, "dateWhen", mark, "createdAt", "updatedAt", "studentId", "courseId") FROM stdin;
    public          postgres    false    226   Hf       H          0    27769    professions 
   TABLE DATA           h   COPY public.professions (id, name, code, "jobTitle", "createdAt", "updatedAt", "facultyId") FROM stdin;
    public          postgres    false    218   �f       J          0    27791    students 
   TABLE DATA           l   COPY public.students (id, name, surname, budget, "createdAt", "updatedAt", "groupId", "userId") FROM stdin;
    public          postgres    false    220   �g       K          0    27808    teachers 
   TABLE DATA           e   COPY public.teachers (id, name, surname, "jobTitle", "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    221   i       Q          0    27893 
   timetables 
   TABLE DATA           R   COPY public.timetables (id, day, "createdAt", "updatedAt", "groupId") FROM stdin;
    public          postgres    false    227   �i       E          0    27740    users 
   TABLE DATA           N   COPY public.users (id, login, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �l       �           2606    27758    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    217            �           2606    27867    attendances attendances_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT attendances_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.attendances DROP CONSTRAINT attendances_pkey;
       public            postgres    false    225            �           2606    27907    classes classes_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.classes DROP CONSTRAINT classes_pkey;
       public            postgres    false    228            �           2606    27824    courses courses_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.courses DROP CONSTRAINT courses_pkey;
       public            postgres    false    222            �           2606    27751    faculties faculties_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.faculties DROP CONSTRAINT faculties_pkey;
       public            postgres    false    216            �           2606    27785    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    219            �           2606    27833 8   m2m_group_courses m2m_group_courses_courseId_groupId_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.m2m_group_courses
    ADD CONSTRAINT "m2m_group_courses_courseId_groupId_key" UNIQUE ("courseId", "groupId");
 d   ALTER TABLE ONLY public.m2m_group_courses DROP CONSTRAINT "m2m_group_courses_courseId_groupId_key";
       public            postgres    false    223    223            �           2606    27831 (   m2m_group_courses m2m_group_courses_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.m2m_group_courses
    ADD CONSTRAINT m2m_group_courses_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.m2m_group_courses DROP CONSTRAINT m2m_group_courses_pkey;
       public            postgres    false    223            �           2606    27852 >   m2m_teacher_courses m2m_teacher_courses_courseId_teacherId_key 
   CONSTRAINT     �   ALTER TABLE ONLY public.m2m_teacher_courses
    ADD CONSTRAINT "m2m_teacher_courses_courseId_teacherId_key" UNIQUE ("courseId", "teacherId");
 j   ALTER TABLE ONLY public.m2m_teacher_courses DROP CONSTRAINT "m2m_teacher_courses_courseId_teacherId_key";
       public            postgres    false    224    224            �           2606    27850 ,   m2m_teacher_courses m2m_teacher_courses_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.m2m_teacher_courses
    ADD CONSTRAINT m2m_teacher_courses_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.m2m_teacher_courses DROP CONSTRAINT m2m_teacher_courses_pkey;
       public            postgres    false    224            �           2606    27882    marks marks_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT marks_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.marks DROP CONSTRAINT marks_pkey;
       public            postgres    false    226            �           2606    27775    professions professions_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.professions
    ADD CONSTRAINT professions_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.professions DROP CONSTRAINT professions_pkey;
       public            postgres    false    218            �           2606    27797    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    220            �           2606    27814    teachers teachers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public            postgres    false    221            �           2606    27897    timetables timetables_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT timetables_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.timetables DROP CONSTRAINT timetables_pkey;
       public            postgres    false    227            �           2606    27746    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    27764    admins admins_facultyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES public.faculties(id) ON UPDATE CASCADE ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_facultyId_fkey";
       public          postgres    false    217    4742    216            �           2606    27759    admins admins_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.admins DROP CONSTRAINT "admins_userId_fkey";
       public          postgres    false    217    4740    215            �           2606    27873 %   attendances attendances_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT "attendances_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public.attendances DROP CONSTRAINT "attendances_courseId_fkey";
       public          postgres    false    225    4754    222            �           2606    27868 &   attendances attendances_studentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendances
    ADD CONSTRAINT "attendances_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.attendances DROP CONSTRAINT "attendances_studentId_fkey";
       public          postgres    false    225    4750    220            �           2606    27913    classes classes_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.classes DROP CONSTRAINT "classes_courseId_fkey";
       public          postgres    false    228    4754    222            �           2606    27908    classes classes_teacherId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public.teachers(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.classes DROP CONSTRAINT "classes_teacherId_fkey";
       public          postgres    false    228    221    4752            �           2606    27918     classes classes_timetableId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.classes
    ADD CONSTRAINT "classes_timetableId_fkey" FOREIGN KEY ("timetableId") REFERENCES public.timetables(id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.classes DROP CONSTRAINT "classes_timetableId_fkey";
       public          postgres    false    4768    228    227            �           2606    27786    groups groups_professionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT "groups_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES public.professions(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public.groups DROP CONSTRAINT "groups_professionId_fkey";
       public          postgres    false    219    218    4746            �           2606    27834 1   m2m_group_courses m2m_group_courses_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.m2m_group_courses
    ADD CONSTRAINT "m2m_group_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public.m2m_group_courses DROP CONSTRAINT "m2m_group_courses_courseId_fkey";
       public          postgres    false    222    4754    223            �           2606    27839 0   m2m_group_courses m2m_group_courses_groupId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.m2m_group_courses
    ADD CONSTRAINT "m2m_group_courses_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
 \   ALTER TABLE ONLY public.m2m_group_courses DROP CONSTRAINT "m2m_group_courses_groupId_fkey";
       public          postgres    false    223    219    4748            �           2606    27853 5   m2m_teacher_courses m2m_teacher_courses_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.m2m_teacher_courses
    ADD CONSTRAINT "m2m_teacher_courses_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE CASCADE;
 a   ALTER TABLE ONLY public.m2m_teacher_courses DROP CONSTRAINT "m2m_teacher_courses_courseId_fkey";
       public          postgres    false    222    4754    224            �           2606    27858 6   m2m_teacher_courses m2m_teacher_courses_teacherId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.m2m_teacher_courses
    ADD CONSTRAINT "m2m_teacher_courses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES public.teachers(id) ON UPDATE CASCADE ON DELETE CASCADE;
 b   ALTER TABLE ONLY public.m2m_teacher_courses DROP CONSTRAINT "m2m_teacher_courses_teacherId_fkey";
       public          postgres    false    4752    221    224            �           2606    27888    marks marks_courseId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT "marks_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES public.courses(id) ON UPDATE CASCADE ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.marks DROP CONSTRAINT "marks_courseId_fkey";
       public          postgres    false    226    222    4754            �           2606    27883    marks marks_studentId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.marks
    ADD CONSTRAINT "marks_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.marks DROP CONSTRAINT "marks_studentId_fkey";
       public          postgres    false    226    4750    220            �           2606    27776 &   professions professions_facultyId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.professions
    ADD CONSTRAINT "professions_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES public.faculties(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public.professions DROP CONSTRAINT "professions_facultyId_fkey";
       public          postgres    false    216    218    4742            �           2606    27798    students students_groupId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT "students_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public.students DROP CONSTRAINT "students_groupId_fkey";
       public          postgres    false    220    4748    219            �           2606    27803    students students_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.students DROP CONSTRAINT "students_userId_fkey";
       public          postgres    false    4740    220    215            �           2606    27815    teachers teachers_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT "teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.teachers DROP CONSTRAINT "teachers_userId_fkey";
       public          postgres    false    215    221    4740            �           2606    27898 "   timetables timetables_groupId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.timetables
    ADD CONSTRAINT "timetables_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public.timetables DROP CONSTRAINT "timetables_groupId_fkey";
       public          postgres    false    4748    219    227            G   w   x�}ͱ� F��L��:��� �Cd7��<&E�dF
��tO���E}�`TBk���r�F�����2�����{
�@�����������2uci����:���w��|�ss�� �K.;      O   z   x�}���0 kk��~�H��F"�	�?�2U���X�"8��0��E��q?Y�������za?M���WE>������p�=5C��X�!+X�Fݥ�L�s��4�F����,�|��(,      R   w  x��VKnc9\ۧ�~@�����Yf#�s��C��v�t6�7���*Y"����). �
t�JmAc�P�'>)��>�����D@�F|`9�/��`��%�S���,���B�*D:�(r*k�O�Z�K�������j�n����K���z�C]�Z%��8�3zA`�SZ�aOQi�ц�脿4�o�oD���b�N�#�i�� Ѻ7l�IW|A��P=�ݶ�������a���j8�:|Wm�զ�O��{U�dU�ڦ����*��{�OU��v����t��V��q���Z�K�{����o�-��.���T=���jS�6��	�؆�a�^VۭwZ��s�ND�i�b����
�=��oU7�sv�`=X.��N��i���<0�eIWs`�ni��qV�T�������:!O�*8cv���;��o�z�&�x��V�>�-a#���X��xRl=�4��z�w9G�&}�����=Mט���90u��v����%%��߱�T��
�C�K�M���'���-�\oy|˕�\s�3�V�Là��u�\�(Y��]ˈK�f��\9���?{���W�k߫�so�舴��k��ehf��FA������-�r��/l_t}�^�� ��5�X� {�̋��19��j��l'�.�?��i���!R�������s3/O���N�q��+{B�
ؑ�34��z�ƫ��i�&w1�zu^LJU��Z��s��u8TsC�Q�f����V/R��l�A��'ǰA�F��ʂ�6�̀Ե�����|90\*t�A�ΌYyZ�f5y��q.����4�޵~���l~�����^���k��|�g��9��>׋1�����*v0]���|�C������|��b
+      L   S   x�}ɱ� ��La�/���b� V��$��x�����n	�� �%���"�d]¸�g��ĜUY1*PMb�?E[$�5�l      F      x�}�K�@��)؛&��`g<��y�`�GL��]ޑl/`�R�����5��L�Y�K֐�ܘlS��/0���9>�`�)n�_��8�x���7K���DH��������?)�U��@y      I   �   x�}��A��*ȑO�۟�EP�%���_BH� M0��Z��U��ؔ�ꀓB<���0p��DHp��85�Sr�s����v��x)S*�d}��e�ڝg03Μ�ꎋR�J�cQL�Q̧�w��$7�A�T�6~���3����4      M   s   x�uɹ�0�X�¹�4���E	@S��`7�M7��&q�>
��O���調?�3�^LW�K��7��н�L>Ȯ&���J����<�����Q{=��)�p��*޻�gk��p&5      N   w   x�}���0kk���O��gq#J��#�Y �5��#����"��X�24e���*J�$����v����������ʢax�P�	���h��~�Gs;w��a=/C�(w(�-Lh��R�\6%
      P   �   x���=n�0�99����,�,],;����@�Pt�H� ���)�֧�f%�K��f��7!10Cxko��yR?U�� ����.���`����A�%�^S�da�gi���&�����}g�kr�������t�q�D�<�[xQ>��� o?�߫����O�      H   �   x�}���0@�s2w��vҤ�,\��Q������z�gg#:z�wy�u*�2`�B�$O,Q:�}.8��Eošw���֧.�K�A�m֏>6���Z۩�# ���@�� {��Vʕ�s�j��Ȑ%u�J�E��G{p��Vw=�      J   R  x��Q�j]A��|��.+i���4�}�i|����"]>"&U0�߰珼�N�1!#F3#�mq�� � ��D�J������~�ٿ��s���ɝy
���'��#��$ZJ�u�z�$(DBhL���(�(V�;�c�&���L~�q���8B ��U�`�\%��m>.�7�����?���pq����k޻�80��RG��xy����FbX�bc�Z�$�ѭŜ���T!�_L)@�YH���:n�������0�د:f/�߄T�GWr�W���j$5�5�슘x6�Ĝ!) "�y	�������m۞=+��      K   �   x�}ɽ�0@�ڞ�]��q�3��؃P@�� E �d��F�h^�=��K��!�x�� �~����]?:�W�7}�[g�6Xt��b���z֗��ɐ#D@�w,��&�v����V� �@(GH���1Qh#�cc���:�      Q   �  x���Mn%;�ǕU����`8ky������ɍ��"u��.�?��9�:��9�Gw�\���}]xQ#D@�������;*���wG6�WB�:�jN`��IV`�O���?T������#ȋ0�5��1��yp9�lV�FZ��5=����0Mp0xL���Y̘
۽�<���wL�HVG�K��AEXӑC�5�$�s֠q@Ȫ�K�� �uooY�;	�V�FxFu���Xa��i���z�N��h1a����9��D�l^-I��y'A��a��)��DM0\
�1T���va���c�W�[ԥ��B-�q�>�B��Ҥ� �ܷ ̳*R�1�R�6�(}<Q�x�(��P՞ s?��Q:��dP�v᭪�yR%�Ĩ^H/ ���L5s?����/Dd�l�I�ǣ9gm ���� ��ݹ�Nfl�����/��B
3ظ�rS�=��kzM@?&�9ʳ�e�2�K5�/�S*-�ž���� R�R��;�8�U�>�<��yz��0�5A�1A��'��
�BN�gy�ސ��n!�[�����
�d�9�����7�B�Z9)��*��m�%�.��"��n!���NT3��ѩ��6�ֻ��e%H�E~M�?'����T�����%Y@�!����� g���@���Qe�n��UK�P>��������u��Գ�+K ������nA���q��eO5��Ի���as������5�x�0~�������o���J      E     x����j1E��Wd_4X[�|K7~ȴ�vѦ��	�ӄ$�%8���-�h�#�v�:fߦ�>dĉ|�������6 �e��
-��!iΉ�8b�V��R�XIs���k��i|$^YV��X�D7(�1c��!9:H���ð�y
�x�<}?�}���<ĕ򂜮T7(od+P��J���,yJ��ʯ���=Q��+�k�dW�:ꐪf��{���s2#q�le����W���Bv�j�"��YA�U03?��`�U�_ǭ�;�K���7���u     