PGDMP  %                    |            uniDiary    16.3    16.3 E    U           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
   TABLE DATA                 public          postgres    false    217   �Y       O          0    27863    attendances 
   TABLE DATA                 public          postgres    false    225   �Z       R          0    27903    classes 
   TABLE DATA                 public          postgres    false    228   w[       L          0    27820    courses 
   TABLE DATA                 public          postgres    false    222   �_       F          0    27747 	   faculties 
   TABLE DATA                 public          postgres    false    216   �`       I          0    27781    groups 
   TABLE DATA                 public          postgres    false    219   ia       M          0    27825    m2m_group_courses 
   TABLE DATA                 public          postgres    false    223   nb       N          0    27844    m2m_teacher_courses 
   TABLE DATA                 public          postgres    false    224   Sc       P          0    27878    marks 
   TABLE DATA                 public          postgres    false    226   :d       H          0    27769    professions 
   TABLE DATA                 public          postgres    false    218   Xe       J          0    27791    students 
   TABLE DATA                 public          postgres    false    220   ef       K          0    27808    teachers 
   TABLE DATA                 public          postgres    false    221   @h       Q          0    27893 
   timetables 
   TABLE DATA                 public          postgres    false    227   ?i       E          0    27740    users 
   TABLE DATA                 public          postgres    false    215   �l       �           2606    27758    admins admins_pkey 
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
       public          postgres    false    4748    219    227            G   �   x���=j�@F{�bp#�h��jV�N�@(��W;#����-r�)�;쑲&M E���|Us�?�j�Op��s�׎/�u�e�\�E2��~7	�E��ƿd���;u����5�
^v�i�e��-YV�Q��Q��l�ɕ��/$� o�=|����׌6�@ښ���s���W��� ���T�;�Eab��kNu�zL��7�R�      O   �   x����n�0E�|��P1�߳�N�**hg��FB%��װTݺݣ{�{��q�q���.�s�&�̉B�<��@k�����Ӣ�8r!���w��)��)w��n�8�3_9��V�s�v�Ųn)�FI�K��3�"��mt�D_�E
��Z��KB���[�n���h#]z@+1:*�N����)��49�1@2�"@��� ����]����q��kUU?��Q�      R   ]  x��MoG����\���0�p�3�SAk�H�&�}>�m���/76jG^�pa�E��+��g���=����__��O_�.vy�*˲N���rx���!�V�:�g1|K��bx�w��o�����i��\nO뮋����6�fٴ�m��v�bwQoۖʷ�9�Ӣ��6������{ۦ��Z�[ٮ��������û��7���h!Qh`C�X�0�t�h18����e[��N_y1��!D@�FcG�%�_�=y0�97����jQ��r��-���l+�L�����AN�����Q�뒗�,H񚉏n�D����]Y3)'������q�k����2�1B��@��8R7�LE��`��Э��G#��K���>3�d�B��%i&,� ى��cG�QZK����I�,�Bq =��K_���ߋ��_x��Kb�&t��U SAp��H���K��$�ҵ��D�-� H�T�[3���r鶴��E�z����G�O��.4�Qf�!�(PS�-�������ND$�:��*6�dMv�K�6O�ޮ��-<���N�>���3�QE�lr�ؼf�T�C���I�E�ߍ�FG���@��k���.����͚�k���6�<W�Ft
`^���/縔MO���zMs�(��hec��F�[����=g��S�$�3�m&�̀J	F��ոU�PX�%��D[�c�͓|Q*9�C�����x�j�O��`/�ܮ:�:O?�'W-�p����d�9��=��	�:�Y��)o�}v�(P6&xՌ'w���u�M�eƞ��UJVE�a���Ֆ�۱��k��3C���C`G��ʒ����k=L� � N����{���u��b	�����Q��c}|n8�r�:!8�r�Yo�E���&�zjrl�S�q]�r5<�����g�����hV�~j;���(�����@��<ȧ������L��O1�J�8�{�ٚC�����E�+,��ρ��C�G �\|�K��G+��z_{UW�Zw�Pٻ�ht�����@��<�'P�9t�T�%��g���l�P��M%LF�Kk�Z�D_���[%N:�֢�'�=WL�&���F)s�d�H�4x��|�E��͛���n      L   �   x���v
Q���W((M��L�K�/-*N-V��L�Q�K�M�QPJ.JM,IMq,QrJR�M�0G�P�`u��d#��DScS]#cc�$S#ݤDCKCc3c3Csu���6]l���Ltu������������	�jZsqq t�/�      F   �   x����
1D�����*n$�ѰZYX��Ov#,�������_`��r?�+��03���7{hu]�gv�D����I��%�8���� r��ō4G%�ǿR�Q�=l�!�k�/K���Y�8�̄�´�-�a�d���O��5�/�g�o����H�I�J�w�\Q��_x#p�~H.�		B�dH*i�������} ��Y�      I   �   x��ϻn�@�ឧ��V�3��.�\�@��_��!%�)��AJ���R�;�N�5���|��=?������/Ӱ�3l���{�S��-�����ǰ�o�X���4tq���ք�����p�m����iB}���%Zf���I.���X0g@��RH��@e-T�EN�|2��5"v�TE�U���ٔ� ��!�=&���1�a�ɈJ����R���qAW�S���Y 5s�:W�O�/o{9WO�| R�t�      M   �   x���1o�0F����A�!��v:10D��T�+�9� ����Mڡc���=}�v���C�ݿC7����7������}���K[�y�f�����s6�е�7��?#.�s�v��`�B�)k�X�J�&�1���Ѣs��]��KP�ɢ1H�^9���/��?�D�R�ѱCK�(�J4�a���j�Bc�`Pr:����H$��ObrV�ע(�jeKE      N   �   x����j�@E{}��fm�1;�ծ�ʅAp vҚ}bbd��#%��i�9�˙�����Qu�㳺����W���ҹ���9��rW�K��y�Z-R_�P�vXL0���Ի<ￊ	V�m���;��v�z�0Bl�a/В����$R�V���J�!D ��ll�a�v�S.�D(C�<�!f��Ā-rþA�my�X� qyz,�X���͜X�걪�/X�Kx      P     x���=OA�{~ņ� 2dgf?�����`"��~]$*���.4����y��df�v�Y=mE��>��?vi���'1���З׷���W������+�|�~�e߷���p<�ZO����y���c�]"m����h)��1Y��l��hH�D �I� �~!�y.������M���8��B�2�'�w���,�H)�tV��i��#vm3���(ٗ�Q�5^��������cх�_\>V7@H_},PΥ�7�~������{ ��      H   �   x���=N�0����ʒV��gǱ�2u�	�v;v���DM2�N�G@BE���s#F�J�޿t�]_e(�d���uU�Q��۶e�kѬ4!ک;��6#��ZgeWY��ުΚU7��1�Py_u�����fuq�ޢY �Z
��. 3N�� �J./��(p��ɽLdq�=�O��#���������W�1�4<�ӑe�L("|	���3y���P�@L5&�՘P��H��:�K�h��=��$�c�      J   �  x�Œ�jA��y�&�Ipk�Ɪ^O9� L�ޟ!�;s7z��͇0x��y��7�g�EO
E󯏦����'��������X���"�7]��U�i&���<�~�C�>��n&��:�.��n�&�*�L�ׯ��2m뛼��P�8z���T4S	H(rM��;��!�t�3궙�f�8܌��w��m�y�n����u_m4(Q�R�Z��Pj���Ij��e�}��cm���Q�6��4W��M�U�� �!���h�es�xo��J��Ȩ�:G���ȱ-��F�[j�o����f:���,?�o�ۉl��_��Z-�r���
e8��C��j�-T�rP�$���%6��
��5k}�
Jpt���zP�%#����{��Z"��,H֘[�w ��뜓F�����Qb�3�F����v�s`I!@KdA{���T�����N���Bn      K   �   x����J�@F�y�!���)sg&���.�H�����`�j���Х����BE�g�y#��q�������2c�2�`��n�|Ҡɯ��٨t!�3����~����Y�l��9��4��� �������cv5?_/Vl�B[�!���p#u�-�j�ȩ\� d��7���#��}ўv};�{ߟ����#}Ҿ{\
�9 Ť�)=��$�����( �%'��&� j.A����	�3��~ �n_Y      Q   g  x�՗=o7@����'�i�EI�!��"��;)Q��5R{�//Kq�C �x��|?�n?~�������矷�G�r7�����/����n^mS���.�W���.���~�����?�o�Ż���?������R�z!�P�0��Z�B�1��Ƙ��ՆW�%%b@��&��k��Cʗ���u�a�|,���ȠZ&���~|s�} ;���Ak�C�
�<��$�l�˒��(/B�W9�/��S��%��BaL�����2�r�q�^
�,��+L��}En�%��cFj�\cs�%=EcV���V�,˩!i�Q�,jщC"0�4�Gs�(���r�Z[�	�-Ϩ��
E�W�y8�Y�SCV�j�:t���wh�#�'�	D�#�~jH�ť�+pc�T���B�Vj�%}�}O�SSjU�Q��"�E�V�Cb�s
��C�y8�HR���׈��l�B��ba?˾9Ϲ} �>E���.���@4e��[�W�)�-�˫X�hї�@c=�j�I�V�y�WJ��j��� ����{*� ԕ�d���(��q��m�X��o�PXx+��{v「EK����)�I����/��-��Ub��\�K\n�2�zFȑ]�a�f��ǀ]٢zs1RW���O1��U@�j�sg���+y��A���&�u��3Bf����_�E��0��� �z�dM�����)y#�
ҥE�&��er�Y#5D�=#��d���Y�d���M)gѥ�!��)�ɯR��(M�����e ��VêG=#���Ռ���H�z�����:�r��3Rz�yО�r�C(g]�U7����g��\Kbn�����a�)�&���x�y>��S��"e���o���Y��      E   �  x���MkA���C.N���4���)�%�&�}>[C�����B1�:�=Ԡëy����>�����;��M�C��z�W����f��0o���p��%�%ߍW�9���F|�����Q\/e.Qg�&!�MB����%s��r%�!�l�'�� �@���L�����b��t��%�,%0E�B�	Y�qJ5��~��L�*A�Wܳ휲s�s�",)WiH'��'N��ie*�W$�\�x�e;��1���"�d:Tz�r�^�ŗH.b �Y����Xj�.Z3V���>�mOSu�ݜ�ܽ�f�f6A��M�������������@ݾ�g�=��нMp�I#�,pp�se:!�Y���w%[u?�9q�b�`F     